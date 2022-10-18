import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as Styles from './industry.module.scss';

import { stripTagParents } from '../../utils/tag';
import ContentGrid from '../../components/content-grid';
import Heading from '../../components/heading';
import IndustryIntro from '../../components/industry-intro';
import MetaTitle from '../../components/meta-title';
import MetaDescription from '../../components/meta-description';
import MetaKeywords from '../../components/meta-keywords';
import CanonicalUrl from '../../components/canonical-url';
import MetaImage from '../../components/meta-image';
import ColorBar from '../../components/color-bar';
import PageDimensions from '../../components/page-dimensions';
import Post from '../../components/post';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import FeaturedJobs from '../../components/featured-jobs';
import { sortByPublishDate } from '../../utils/entries-node';

function Industry({ data }) {
  const { industry, tag } = data;
  const title = stripTagParents(tag.name);
  const content = sortByPublishDate([...data.articles.nodes, ...data.multimedia.nodes]);

  const pageDimensions = {
    contentId: industry.id,
    contentType: 'Industries',
    ...(industry.mainArticle &&
      industry.mainArticle.videos &&
      industry.mainArticle.videos.length > 0 && { videoId: industry.mainArticle.videos[0].videoId }),
  };

  return (
    <div className={Styles.root}>
      <PageDimensions dimensions={pageDimensions} />
      <MetaTitle title={industry.metaTitle ? industry.metaTitle : title} />
      <MetaDescription description={industry.metaDescription ? industry.metaDescription : industry.deck} />
      <MetaKeywords keywords={industry.metaKeywords} />
      <MetaImage />
      <CanonicalUrl url={industry.canonicalUrl} />
      <div className={Styles.headerContainer}>
        <GatsbyImage
          className={Styles.header}
          image={getImage(industry.headerImage.media.image)}
          alt={industry.headerImage.alt}
        />
        <Heading level={1} className={Styles.title}>
          {industry.title}
        </Heading>
        <Heading level={2} className={Styles.subtitle}>
          {industry.subtitle}
        </Heading>
      </div>
      <ColorBar color={industry.foregroundColor} />
      <div className={classNames(Styles.main, 'container')}>
        <IndustryIntro industry={industry} />
        {industry.mainArticle && (
          <Post
            hit={industry.mainArticle}
            headingLevel={2}
            className={classNames(Styles.mainArticle, 'container container-md')}
            foregroundColor={industry.foregroundColor}
          />
        )}
        {!industry.comingSoon && industry.featuredContent && industry.featuredContent.length > 0 && (
          <ContentGrid
            content={industry.featuredContent}
            headingLevel={3}
            title="Featured Content"
            foregroundColor={industry.foregroundColor}
            backgroundColor={industry.foregroundColor}
          />
        )}
        {industry.jobs && industry.jobs.length > 0 && (
          <FeaturedJobs
            jobs={industry.jobs}
            headingLevel={3}
            title="Jobs at a Glance"
            foregroundColor={industry.foregroundColor}
            showHeatHighlight
          />
        )}
        {!industry.comingSoon && content && content.length > 0 && (
          <ContentGrid
            content={content}
            headingLevel={3}
            title="Related Content"
            foregroundColor={industry.foregroundColor}
          />
        )}
      </div>
    </div>
  );
}

const CommonPostType = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      videoId: PropTypes.string,
    })
  ),
});

Industry.propTypes = {
  data: PropTypes.shape({
    industry: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      deck: PropTypes.string,
      body: PropTypes.shape({
        raw: PropTypes.string,
      }),
      description: PropTypes.string,
      headerImage: PropTypes.shape({
        alt: PropTypes.string,
        media: PropTypes.shape({
          image: PropTypes.shape({}),
        }),
      }),
      foregroundColor: PropTypes.string,
      comingSoon: PropTypes.bool,
      metaTitle: PropTypes.string,
      metaDescription: PropTypes.string,
      metaKeywords: PropTypes.string,
      canonicalUrl: PropTypes.string,
      mainArticle: CommonPostType,
      featuredContent: PropTypes.arrayOf(CommonPostType),
      jobs: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
        })
      ),
    }),
    tag: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    articles: PropTypes.shape({
      nodes: PropTypes.arrayOf(CommonPostType),
    }),
    multimedia: PropTypes.shape({
      nodes: PropTypes.arrayOf(CommonPostType),
    }),
  }).isRequired,
};

export const query = graphql`
  query INDUSTRY($id: String, $tag: String) {
    industry: contentfulIndustry(id: { eq: $id }) {
      id
      title
      subtitle
      deck
      ...IndustryRichTextFields
      foregroundColor
      comingSoon
      headerImage {
        alt
        media {
          image: gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      description
      metaTitle
      metaDescription
      metaKeywords
      mainArticle {
        ...PostArticleFields
        ...PostMultimediaFields
      }
      featuredContent {
        ...PostAskFields
        ...PostArticleFields
        ...PostMultimediaFields
      }
      jobs {
        ...JobFields
      }
      internal {
        type
      }
    }
    tag: contentfulTag(id: { eq: $tag }) {
      id
      name
    }
    articles: allContentfulArticle(
      filter: { title: { regex: "/^(?!___PLACEHOLDER___)/i" }, metadata: { tags: { elemMatch: { id: { eq: $tag } } } } }
    ) {
      ...ContentGridArticleFields
    }
    multimedia: allContentfulMultimedia(
      filter: { title: { regex: "/^(?!___PLACEHOLDER___)/i" }, metadata: { tags: { elemMatch: { id: { eq: $tag } } } } }
    ) {
      ...ContentGridMultimediaFields
    }
  }
`;

export default Industry;
