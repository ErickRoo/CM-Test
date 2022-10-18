require('dotenv').config({
  path: `../../.env.${process.env.NODE_ENV}`,
});
// eslint-disable-next-line import/no-extraneous-dependencies
const { getSiteUrl } = require('greenlight-shared/src/utils/get-site-url');
const siteConfig = require('./site-config');

const { pathPrefix } = siteConfig;

module.exports = {
  // see https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/
  pathPrefix: `/${pathPrefix}`,
  siteMetadata: {
    title: 'Your Lit Job',
    siteUrl: getSiteUrl({ baseDomain: 'www.timeforkids.com' }),
  },
  plugins: [
    {
      resolve: 'greenlight-core',
      options: {
        ...siteConfig,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./src/assets`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [siteConfig.ga.id],
        gtagConfig: siteConfig.ga.config,
      },
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.GATSBY_YLJ_ALGOLIA_APP_ID,
        apiKey: process.env.YLJ_ALGOLIA_ADMIN_API_KEY,
        indexName: process.env.GATSBY_YLJ_ALGOLIA_PRIMARY_INDEX,
        queries: [
          {
            query: `
              query {
                pages: allContentfulEntry(filter: {internal: {type: {in: ["ContentfulArticle", "ContentfulMeetup", "ContentfulAsk", "ContentfulMultimedia"]}}}) {
                  nodes {
                    objectID: contentful_id
                    ... on ContentfulArticle {
                      id
                      title
                      slug
                      sticky
                      displayVideoOnFeed
                      videos {
                        id
                        videoId
                      }
                      modified: updatedAt
                      publishDate
                      primaryImage {
                        alt
                        media {
                          image: gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.5)
                        }
                      }
                      description {
                        description
                      }
                      asSeenOn
                      metadata {
                        tags {
                          name
                          contentful_id
                        }
                      }
                      internal {
                        type
                      }
                    }
                    ... on ContentfulMultimedia {
                      id
                      title
                      slug
                      sticky
                      videos {
                        id
                        videoId
                      }
                      modified: updatedAt
                      publishDate
                      primaryImage {
                        alt
                        media {
                          image: gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.5)
                        }
                      }
                      description {
                        description
                      }
                      asSeenOn
                      metadata {
                        tags {
                          name
                          contentful_id
                        }
                      }
                      internal {
                        type
                      }
                    }
                    ... on ContentfulAsk {
                      id
                      title
                      slug
                      sticky
                      modified: updatedAt
                      publishDate
                      primaryImage {
                        alt
                        media {
                          image: gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.5)
                        }
                      }
                      description {
                        description
                      }
                      metadata {
                        tags {
                          name
                          contentful_id
                        }
                      }
                      internal {
                        type
                      }
                    }
                    ... on ContentfulMeetup {
                      id
                      title
                      slug
                      sticky
                      modified: updatedAt
                      eventDate
                      description {
                        description
                      }
                      primaryImage {
                        alt
                        media {
                          image: gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.5)
                        }
                      }
                      meetingLink
                      video {
                        id
                        videoId
                      }
                      metadata {
                        tags {
                          name
                          contentful_id
                        }
                      }
                      internal {
                        type
                      }
                    }
                  }
                }
              }
            `,
            transformer: ({ data }) => data.pages.nodes,
          },
        ],
        enablePartialUpdates: true,
        chunkSize: 1000,
      },
    },
  ],
};
