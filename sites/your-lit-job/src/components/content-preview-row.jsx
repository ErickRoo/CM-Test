import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import classNames from 'classnames';
import * as Styles from './content-preview-row.module.scss';
import Heading from './heading';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import ColorBar from './color-bar';
import { trackEvent } from '../utils/track';
import TrackImpression from './track-impression';
import { getGatsbyImage } from '../utils/image';
import FavoriteButton from './favorite-button';
import ContentTypeIcon from './content-type-icon';
import { toSlug } from '../utils/tag';

function ContentPreviewRow({ content, className, headingLevel, tracking, showFavorite, showContentType }) {
  const rootElement = useRef();
  const industry = content.industryData;

  const trackClick = () => {
    if (tracking) {
      trackEvent('Recirc Click', 'Content Action', `article-end-recirc | ${content.id}`);
    }
  };

  const trackImpression = () => {
    trackEvent('Recirc Impression', 'Content Action', `article-end-recirc | ${content.id}`, null, {
      non_interaction: true,
    });
  };

  const primaryImage = getGatsbyImage(content.primaryImage);
  const industryImage = getGatsbyImage(industry?.headerImage);
  const linkIndustry = industry?.title ? toSlug(industry.title) : '';

  return (
    <div className={classNames(Styles.root, className)} ref={rootElement}>
      {tracking && <TrackImpression onImpression={trackImpression} element={rootElement} />}
      <Link to={`/industries/${linkIndustry}`} className={Styles.linkIndustry}>
        {industry?.headerImage && (
          <>
            <GatsbyImage className={Styles.industryImage} image={industryImage} alt={industry.headerImage.alt} />
            <div className={Styles.linkTitle}>{industry.title}</div>
          </>
        )}
      </Link>
      <div className={Styles.imageWrapper}>
        {showFavorite && <FavoriteButton postId={content.id} corner size="small" />}
        {showContentType && <ContentTypeIcon corner size="small" type={content.internal.type} />}
        <Link to={`/articles/${content.slug}`} onClick={trackClick}>
          {primaryImage && (
            <GatsbyImage
              className={classNames(Styles.primaryImage, !industry?.headerImage && Styles.blankIndustry)}
              image={primaryImage}
              alt={content.primaryImage.alt}
            />
          )}
        </Link>
      </div>
      <ColorBar color="#ff2630" />
      <div className={Styles.copy}>
        <Heading level={headingLevel} className={Styles.title}>
          <Link to={`/articles/${content.slug}`} onClick={trackClick}>
            {content.title}
          </Link>
        </Heading>
        <div className={classNames(Styles.description)}>{content.description.description}</div>
      </div>
    </div>
  );
}

ContentPreviewRow.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    slug: PropTypes.string,
    primaryImage: PropTypes.shape({
      alt: PropTypes.string,
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
    internal: PropTypes.shape({
      type: PropTypes.string,
    }),
    description: PropTypes.shape({
      description: PropTypes.string,
    }),
    industryData: PropTypes.shape({
      headerImage: PropTypes.shape({
        alt: PropTypes.string,
        media: PropTypes.shape({
          image: PropTypes.shape({}),
        }),
      }),
      title: PropTypes.string,
    }),
  }).isRequired,
  className: PropTypes.string,
  headingLevel: PropTypes.number,
  tracking: PropTypes.bool,
  showFavorite: PropTypes.bool,
  showContentType: PropTypes.bool,
};

ContentPreviewRow.defaultProps = {
  className: null,
  headingLevel: 0,
  tracking: true,
  showFavorite: true,
  showContentType: true,
};

export const query = graphql`
  fragment ArticlePreviewRowFields on ContentfulArticle {
    id
    title
    slug
    primaryImage {
      alt
      media {
        image: gatsbyImageData(layout: FIXED, width: 240, height: 160)
      }
    }
    metadata {
      tags {
        ...TagsFields
      }
    }
    internal {
      type
    }
    description {
      description
    }
  }
  fragment MultimediaPreviewRowFields on ContentfulMultimedia {
    id
    title
    slug
    primaryImage {
      alt
      media {
        image: gatsbyImageData(layout: FIXED, width: 240, height: 160)
      }
    }
    metadata {
      tags {
        ...TagsFields
      }
    }
    internal {
      type
    }
    description {
      description
    }
  }
`;

export default ContentPreviewRow;
