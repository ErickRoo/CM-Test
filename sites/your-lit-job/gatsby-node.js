// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
const { arrayShuffle } = require('./src/utils/array-node');
const { sortEntriesByPriority } = require('./src/utils/entries-node');
const { filterTagsByParent, toSlug } = require('./src/utils/tag-node');
const { searchNavbarIndustryByTagName } = require('./src/utils/industries-node');
const { removePlaceholderNodes, isPlaceholder } = require('./src/utils/placeholder-node');

// ignores the conflicting ordering errors from the MiniCssExtractPlugin
exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  const config = getConfig();
  if (stage === 'develop') {
    const miniCssExtractPlugin = config.plugins.find((plugin) => plugin.constructor.name === 'MiniCssExtractPlugin');
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }
    actions.replaceWebpackConfig(config);
  }

  const reConfig = {
    ...config,
    resolve: {
      ...config.resolve,
      fallback: {
        ...config?.resolve?.fallback,
        process: require.resolve('process/browser'),
        zlib: require.resolve('browserify-zlib'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util'),
        buffer: require.resolve('buffer'),
        asset: require.resolve('assert'),
      },
    },
    plugins: [
      ...config.plugins,
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser',
      }),
    ],
  };

  actions.replaceWebpackConfig(reConfig);
};

const queryArticleMultimedia = `
  query {
    allContentfulEntry(
      filter: {internal: {type: {in: ["ContentfulArticle", "ContentfulMultimedia"]}}}
    ) {
      nodes {
        ... on ContentfulArticle {
          id
          slug
          publishDate
          metadata {
            tags {
              id
              contentful_id
              name
            }
          }
          internal {
            type
          }
        }
        ... on ContentfulMultimedia {
          id
          slug
          publishDate
          metadata {
            tags {
              id
              contentful_id
              name
            }
          }
          internal {
           type
          }
        }
      }
    }
  }
`;

async function createIndustryPages({ actions, graphql, reporter }) {
  const { createPage } = actions;

  const tagResults = await graphql(`
    query {
      tags: allContentfulTag(filter: { name: { regex: "/^Industry:.*/i" } }) {
        nodes {
          id
        }
      }
    }
  `);

  if (tagResults.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for tags to create industry pages.`);
    return;
  }

  const industryResults = await graphql(`
    query {
      industries: allContentfulIndustry(
        filter: {
          title: { regex: "/^(?!___PLACEHOLDER___)/i" },
          metadata: {tags: {elemMatch: {id: {in: [${tagResults.data.tags.nodes.map((tag) => `"${tag.id}"`)}] }}}}}
      ) {
        nodes {
          id
          title
          metadata {
            tags {
              id
              contentful_id
              name
            }
          }
        }
      }
    }
  `);

  if (tagResults.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for industries to create industry pages.`);
  }

  industryResults.data.industries.nodes.forEach((industry) => {
    const tags = filterTagsByParent(industry.metadata.tags, ['Industry']);
    const industryFound = searchNavbarIndustryByTagName(tags?.[0]?.name);

    if (industryFound && tags[0]) {
      const tag = tags[0];

      createPage({
        path: `industries/${toSlug(tag.name)}`,
        component: require.resolve('./src/pages/industries/industry.jsx'),
        context: {
          id: industry.id,
          tag: tag.id,
        },
      });
    }
  });
}

/**
 * Method used to generate content pages with related content
 *
 * @param args
 * @param query
 * @param type
 * @param path
 * @param template
 * @param maxRelatedEntries
 * @param allowedParents
 * @returns {Promise<void>}
 */
async function createContentPage(
  { actions, graphql, reporter },
  pageQuery,
  relatedQuery,
  pageType,
  path,
  template,
  maxRelatedEntries = 3,
  allowedParents = ['Skill']
) {
  const { createPage } = actions;

  // Get pages to create
  let pageResults;
  if (typeof pageQuery === 'object') {
    pageResults = { ...pageQuery };
  } else {
    pageResults = await graphql(pageQuery);
    if (pageResults.errors) {
      reporter.panicOnBuild(`Error while running GraphQL pageQuery to create pages for ${template}.`);
    }
  }

  // If relatedQuery is defined, than query to get related content
  // If relatedQuery is not defined, than pageResults (built from pageQuery) will be used
  let relatedResults;
  if (relatedQuery) {
    relatedResults = await graphql(relatedQuery);

    if (relatedResults.errors) {
      reporter.panicOnBuild(`Error while running GraphQL relatedQuery to create pages for ${template}.`);
    }
  } else {
    relatedResults = pageResults;
  }

  // Remove placeholder pages as GraphQL cannot do that with multi content types
  let pageContents = removePlaceholderNodes(pageResults.data[Object.keys(pageResults.data)[0]].nodes);
  const relatedContents = removePlaceholderNodes(relatedResults.data[Object.keys(relatedResults.data)[0]].nodes);

  // If relatedQuery is false and pageType is defined than page should only be built based on a specific content type
  if (!relatedQuery && pageType) {
    pageContents = pageContents.filter((content) => {
      return content.internal.type === pageType;
    });
  }

  // Build pages
  pageContents.forEach((content) => {
    // Find related content by tags
    const tags = filterTagsByParent(content.metadata.tags, allowedParents).map((tag) => tag.contentful_id);
    let pageRelatedContents = sortEntriesByPriority(
      [...relatedContents].filter((a) => a.id !== content.id),
      null,
      (ra) => {
        let { points } = ra;
        if (ra.metadata && ra.metadata.tags) {
          ra.metadata.tags.forEach((tag) => {
            if (tags.includes(tag.contentful_id)) {
              points += 10;
            }
          });
        }
        return points;
      }
    );

    // Isolate content with points and content without points, randomize independently, and merge
    pageRelatedContents = [
      ...arrayShuffle(pageRelatedContents.filter((p) => p.points)),
      ...arrayShuffle(pageRelatedContents.filter((p) => !p.points)),
    ];

    const relatedIndustry = [];
    const relatedContent = pageRelatedContents
      .map((e) => {
        const onlyIndustries = filterTagsByParent(e.metadata.tags, ['Industry']).filter((tag) => {
          if (tag.contentful_id === 'industrycareerdevelopment') return false;
          return tag.name.includes('Industry');
        });
        return { ...e, industryTags: onlyIndustries };
      })
      .filter((oneRelContent) => {
        const tagSelected = oneRelContent?.industryTags?.find((oneTag) => {
          const findInRelatedArray = relatedIndustry.includes(oneTag.name);
          return !findInRelatedArray;
        });

        if (tagSelected && relatedIndustry.length < maxRelatedEntries) {
          relatedIndustry.push(tagSelected.name);
          return true;
        }
        return false;
      })
      .map((relatedArticle) => relatedArticle.id);

    createPage({
      path: `${path}/${content.slug}`,
      component: require.resolve(template),
      context: {
        id: content.id,
        relatedContent,
        relatedIndustry,
      },
    });
  });
}

async function createMeetUpInterviewPage({ actions, graphql, reporter }) {
  const { createPage } = actions;

  const meetUpInterviewsResults = await graphql(`
    query ALL_MEETUP_INTERVIEWS {
      meetUpInterviews: allContentfulMeetup(filter: { title: { regex: "/^(?!___PLACEHOLDER___)/i" } }) {
        nodes {
          id
          slug
        }
      }
    }
  `);

  // handle errors
  if (meetUpInterviewsResults.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for meetUpInterview to create meetUpInterview pages.`);
  }

  const meetUpInterviews = meetUpInterviewsResults.data.meetUpInterviews.nodes;

  meetUpInterviews.forEach((meetUpInterview) => {
    createPage({
      path: `meetups/${meetUpInterview.slug}`,
      component: require.resolve('./src/templates/meetup-interview.jsx'),
      context: {
        id: meetUpInterview.id,
      },
    });
  });
}

async function removePlaceholderPages({ page, actions }) {
  const { deletePage } = actions;

  if (isPlaceholder(page)) {
    deletePage(page);
  }
}

exports.createPages = async (args) => {
  const { graphql } = args;
  await createIndustryPages(args);

  const resultArticleMultimedia = await graphql(queryArticleMultimedia);

  // Create article pages
  await createContentPage(
    args,
    resultArticleMultimedia,
    false,
    'ContentfulArticle',
    'articles',
    './src/pages/articles/article.jsx'
  );

  // Create multimedia pages
  await createContentPage(
    args,
    resultArticleMultimedia,
    false,
    'ContentfulMultimedia',
    'articles',
    './src/pages/multimedia/multimedia.jsx'
  );

  // Create ask pages
  const queryAskPages = `
    query ALL_ASK_INTERVIEWS {
      askInterviews: allContentfulAsk(filter: { title: { regex: "/^(?!___PLACEHOLDER___)/i" } }) {
        nodes {
          id
          slug
          publishDate
          metadata {
            tags {
              id
              contentful_id
              name
            }
          }
        }
      }
    }
  `;
  await createContentPage(
    args,
    queryAskPages,
    queryArticleMultimedia,
    false,
    'ask-me-anything',
    './src/templates/ask-interview.jsx'
  );

  // Create meetup pages
  await createMeetUpInterviewPage(args);
};

exports.onCreatePage = async (args) => {
  await removePlaceholderPages(args);
};
