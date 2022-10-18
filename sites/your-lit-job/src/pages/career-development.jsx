import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import VideoPlayer from '../components/video-player';
import * as Styles from './career-development.module.scss';

import { stripTagParents } from '../utils/tag';
import ContentGrid from '../components/content-grid';
import Heading from '../components/heading';
import IndustryIntro from '../components/industry-intro';

import MetaTitle from '../components/meta-title';
import MetaDescription from '../components/meta-description';
import MetaKeywords from '../components/meta-keywords';
import CanonicalUrl from '../components/canonical-url';
import MetaImage from '../components/meta-image';
import PageDimensions from '../components/page-dimensions';

function CareerDevelopment({ data }) {
  const { industry, tag } = data;
  const articles = data.articles.nodes;
  const title = stripTagParents(tag.name);

  const pageDimensions = {
    contentId: industry.id,
    contentType: 'Industries',
    ...(industry.video && { videoId: industry.video.videoId }),
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
          {title}
        </Heading>
      </div>
      <div className={classNames(Styles.main, 'container')}>
        <div className={Styles.emojisGroup} />
        <IndustryIntro industry={industry} />
        {industry.video && (
          <VideoPlayer mediaId={industry.video.videoId} className={classNames(Styles.video, 'container')} />
        )}
        {articles.length > 0 && !industry.comingSoon && (
          <ContentGrid
            content={articles}
            headingLevel={2}
            title="Related Content"
            foregroundColor={industry.foregroundColor}
          />
        )}
      </div>
    </div>
  );
}

CareerDevelopment.propTypes = {
  data: PropTypes.shape({
    industry: PropTypes.shape({
      id: PropTypes.string,
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
      video: PropTypes.shape({
        videoId: PropTypes.string,
      }),
      foregroundColor: PropTypes.string,
      comingSoon: PropTypes.bool,
      metaTitle: PropTypes.string,
      metaDescription: PropTypes.string,
      metaKeywords: PropTypes.string,
      canonicalUrl: PropTypes.string,
    }),
    tag: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    articles: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
};

export default CareerDevelopment;

export const queryCareerDevelopment = graphql`
  query QUERY_CAREER_DEVELOPMENT($id: String = "industrycareerdevelopment") {
    industry: contentfulIndustry(metadata: { tags: { elemMatch: { contentful_id: { eq: $id } } } }) {
      id
      deck
      ...IndustryRichTextFields
      video {
        ...JwPlayerFields
      }
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
      internal {
        type
      }
    }
    tag: contentfulTag(contentful_id: { eq: $id }) {
      id
      name
    }
    articles: allContentfulArticle(
      filter: { metadata: { tags: { elemMatch: { contentful_id: { eq: $id } } } } }
      sort: { fields: publishDate, order: DESC }
    ) {
      ...ContentGridArticleFields
    }
  }
`;
