import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import ArticleRichText from '../../components/article-rich-text';
import * as Styles from './multimedia.module.scss';
import MoreContent from '../../components/more-content';
import Heading from '../../components/heading';
import Authors, { hasAuthors } from '../../components/authors';
import Date from '../../components/date';
import MetaTitle from '../../components/meta-title';
import MetaDescription from '../../components/meta-description';
import MetaKeywords from '../../components/meta-keywords';
import ArticleVideos, { hasVideos as articleVideosHasVideos } from '../../components/article-videos';
// eslint-disable-next-line import/no-named-as-default
import Tags, { defaultAllowedParents } from '../../components/tags';
import AsSeenOn from '../../components/as-seen-on';
import Like from '../../components/like';
import CanonicalUrl from '../../components/canonical-url';
import MetaImage from '../../components/meta-image';
import ColorBar from '../../components/color-bar';
import PageDimensions from '../../components/page-dimensions';
import { filterTagsByParent, stripTagParents, getHumanTagList } from '../../utils/tag';
import ArticleBadgeProgress from '../../components/article-badge-progress';
import ContentActions from '../../components/content-actions';

function Multimedia({ data, pageContext }) {
  const { article } = data;

  /* if moreContent.length > maxRelatedEntries, check your GraphQL query in gatsby-node */
  let moreContent = [];

  if (pageContext.relatedContent) {
    moreContent = pageContext.relatedContent.map((id, idx) => {
      const obj = data.moreContent.nodes.find((moreArticle) => moreArticle.id === id);
      obj.industry = pageContext.relatedIndustry[idx];
      return obj;
    });
  } else if (data.moreContent.nodes) {
    moreContent = data.moreContent.nodes;
  }
  const industries = filterTagsByParent(article.metadata.tags, defaultAllowedParents);
  const skills = filterTagsByParent(article.metadata.tags, ['skill']);
  const hasVideos = articleVideosHasVideos(article.videos);

  const likeCallToAction = () => {
    if (industries.length === 1) {
      return hasVideos
        ? `Did this video help you learn more about a future career path?`
        : `Did this article help you learn more about the ${getHumanTagList(industries)} industry?`;
    }

    if (industries.length > 1) {
      return hasVideos
        ? `Did this video help you learn more about ${getHumanTagList(industries)} industries?`
        : `Did this article help you learn more about ${getHumanTagList(industries)} industries?`;
    }

    return hasVideos
      ? 'Did this video help you learn more about a future career path?'
      : 'Did this article help you learn more about a future career path?';
  };

  const pageDimensions = {
    industry: industries ? industries.map((industry) => stripTagParents(industry.name)).join('|') : null,
    skill: skills ? skills.map((skill) => stripTagParents(skill.name)).join('|') : null,
    publishDate: article.publishDate,
    contentType: 'Article pages',
    contentId: article.id,
    ...(hasVideos && { videoId: article.videos.map((video) => video.videoId).join(',') }),
  };

  return (
    <div className={classNames(Styles.root)}>
      <ArticleBadgeProgress article={article} />
      <PageDimensions dimensions={pageDimensions} />
      <MetaTitle title={article.metaTitle ? article.metaTitle : article.title} />
      <MetaDescription
        description={article.metaDescription ? article.metaDescription : article.description.description}
      />
      <MetaKeywords keywords={article.metaKeywords} />
      {article.primaryImage && article.primaryImage.media && article.primaryImage.media.image && (
        <MetaImage image={article.primaryImage.media.image} />
      )}
      <CanonicalUrl url={article.canonicalUrl} />
      <ColorBar />
      <article className={Styles.article}>
        <div className={classNames('container', 'container-hpad-md')}>
          <div className={classNames('container', 'container-lg')}>
            <div className={Styles.meta}>
              {industries.length > 0 && <Tags tags={industries} className={Styles.tags} />}
              <Date
                date={article.publishDate}
                className={classNames(Styles.date, [
                  {
                    [Styles.pipe]: industries.length > 0,
                  },
                ])}
              />
            </div>
            <Heading level={1} className={Styles.title}>
              {article.title}
            </Heading>
            <div className={Styles.deck}>{article.deck}</div>
            <div className={Styles.attribution}>
              {hasAuthors(article.authors) && (
                <div className={Styles.authors}>
                  By <Authors authors={article.authors} className={Styles.authorsList} />
                </div>
              )}
              <AsSeenOn source={article.asSeenOn} className={Styles.asSeenOn} />
            </div>
            <ContentActions favorite={article.id} className={Styles.contentActions} />

            {hasVideos && <ArticleVideos videos={article.videos} />}
          </div>
          {article.body && (
            <div className={classNames(Styles.body, 'container')}>
              <ArticleRichText body={article.body} headingLevel={2} />
            </div>
          )}

          <div className={classNames(Styles.likeContainer, 'container', 'container-sm')}>
            <Like contentId={article.id} callToAction={likeCallToAction()} />
          </div>
        </div>
      </article>
      <aside className={Styles.moreContent}>
        <div className={classNames('container', 'container-hpad-md')}>
          <div className={classNames('container')}>
            <MoreContent headingLevel={2} content={moreContent} title="Ready for more? Check out..." />
          </div>
        </div>
      </aside>
    </div>
  );
}

Multimedia.propTypes = {
  data: PropTypes.shape({
    article: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.shape({}),
      publishDate: PropTypes.string,
      authors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
      description: PropTypes.shape({
        description: PropTypes.string,
      }),
      videos: PropTypes.arrayOf(PropTypes.shape({})),
      deck: PropTypes.string,
      asSeenOn: PropTypes.string,
      metaTitle: PropTypes.string,
      metaDescription: PropTypes.string,
      metaKeywords: PropTypes.string,
      canonicalUrl: PropTypes.string,
      primaryImage: PropTypes.shape({
        description: PropTypes.string,
        alt: PropTypes.string,
        source: PropTypes.string,
        media: PropTypes.shape({
          image: PropTypes.shape({}),
        }),
      }),
      metadata: PropTypes.shape({
        tags: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
          })
        ),
      }),
      badgeProgress: PropTypes.arrayOf(PropTypes.shape({ badge: PropTypes.number, progress: PropTypes.string })),
    }),
    moreContent: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    relatedContent: PropTypes.arrayOf(PropTypes.string),
    relatedIndustry: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export const query = graphql`
  query ($id: String, $relatedContent: [String]) {
    article: contentfulMultimedia(id: { eq: $id }) {
      id
      title
      ...MultimediaRichTextFields
      authors {
        ...AuthorsFields
      }
      description {
        description
      }
      videos {
        ...ArticleVideosFields
      }
      primaryImage {
        alt
        description
        source
        media {
          image: gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.5)
        }
      }
      publishDate
      deck
      asSeenOn
      metaTitle
      metaDescription
      metaKeywords
      canonicalUrl
      metadata {
        tags {
          ...TagsFields
        }
      }
      badgeProgress {
        badge
        progress
      }
      internal {
        type
      }
    }
    moreContent: allContentfulEntry(limit: 3, filter: { id: { in: $relatedContent, ne: $id } }) {
      nodes {
        ...MoreMultimediaFields
        ...MoreArticlesFields
      }
    }
  }
`;

export default Multimedia;
