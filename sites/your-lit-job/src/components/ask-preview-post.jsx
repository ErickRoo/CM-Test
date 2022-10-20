import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import classNames from 'classnames';
import * as PostStyles from './post.module.scss';
import * as Styles from './ask-preview-post.module.scss';
import Heading from './heading';
import Button from './button';
import FavoriteButton from './favorite-button';
import { getGatsbyImage } from '../utils/image';
import ContentTypeIcon from './content-type-icon';

function AskPreviewPost({ post, headingLevel, className, showFavoriteButton }) {
  const path = `/ask-me-anything/${post.slug}`;

  const primaryImage = getGatsbyImage(post.primaryImage);

  return (
    <div className={classNames(Styles.root, className)}>
      <Link to={path}>
        <div className={classNames(PostStyles.primaryImageContainer, Styles.primaryImageContainer)}>
          <ContentTypeIcon type={post.internal.type} corner />
          {primaryImage && (
            <GatsbyImage
              image={primaryImage}
              alt={post.primaryImage.alt}
              className={classNames(PostStyles.primaryImage)}
            />
          )}
          <div className={classNames(PostStyles.primaryImageHover)}>
            <Button size="md" type="div" theme="green" width="md">
              Start
            </Button>
          </div>
        </div>
      </Link>

      <div className={classNames(PostStyles.content, 'container container-pad-lg')}>
        <div className="clearfix">
          {post.subhead && <div className={classNames(Styles.subhead, PostStyles.subhead)}>{post.subhead}</div>}
          <Heading level={headingLevel} className={classNames(PostStyles.title)}>
            <Link to={path}>{post.title}</Link>
          </Heading>
          <div className={classNames(PostStyles.description)}>{post.description.description}</div>
          {showFavoriteButton && <FavoriteButton postId={post.id} className={PostStyles.favorite} />}
        </div>
      </div>
    </div>
  );
}

AskPreviewPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    slug: PropTypes.string,
    path: PropTypes.string,
    primaryImage: PropTypes.shape({
      alt: PropTypes.string,
      media: PropTypes.shape({
        image: PropTypes.shape({}),
      }),
    }),
    description: PropTypes.shape({
      description: PropTypes.string,
    }),
    subhead: PropTypes.string,
    internal: PropTypes.shape({
      type: PropTypes.string,
    }),
  }).isRequired,
  headingLevel: PropTypes.number,
  className: PropTypes.string,
  showFavoriteButton: PropTypes.bool,
};

AskPreviewPost.defaultProps = {
  headingLevel: 0,
  className: null,
  showFavoriteButton: false,
};

// Note: Fields added to this query need to be added to `gatsby-config.js` Algolia query
export const query = graphql`
  fragment AskPreviewPostFields on ContentfulAsk {
    id
    title
    slug
    sticky
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
        ...TagsFields
      }
    }
  }
`;

export default AskPreviewPost;
