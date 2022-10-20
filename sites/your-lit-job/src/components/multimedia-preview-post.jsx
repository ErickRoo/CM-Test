import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import classNames from 'classnames';
import VideoPlayer from './video-player';
import * as PostStyles from './post.module.scss';
import * as Styles from './multimedia-preview-post.module.scss';
import Heading from './heading';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import Tags from './tags';
import AsSeenOn from './as-seen-on';
import Button from './button';
import ColorBar from './color-bar';
import { getGatsbyImage } from '../utils/image';

import FavoriteButton from './favorite-button';
import ContentTypeIcon from './content-type-icon';

function MultimediaPreviewPost({ post, headingLevel, className, foregroundColor, ssr, showFavoriteButton }) {
  const showVideo = () => {
    return post.videos && post.videos[0] && post.videos[0].videoId;
  };

  const primaryImage = getGatsbyImage(post.primaryImage);
  return (
    <div className={classNames(className)}>
      <div className={classNames(PostStyles.primaryImageContainer, Styles.primaryImageContainer)}>
        <ContentTypeIcon type={post.internal.type} corner />
        {!showVideo() && (
          <Link to={`/articles/${post.slug}`}>
            {primaryImage && (
              <GatsbyImage
                className={classNames(PostStyles.primaryImage)}
                image={primaryImage}
                alt={post.primaryImage.alt}
              />
            )}
            <div className={classNames(PostStyles.primaryImageHover)}>
              <Button size="md" type="div" action={null} theme="green" width="md">
                Read
              </Button>
            </div>
          </Link>
        )}

        {showVideo() && !ssr && <VideoPlayer mediaId={post.videos[0].videoId} rounded="top" />}
        <ColorBar color={foregroundColor} />
      </div>
      <div className={classNames(PostStyles.content, 'container container-pad-lg')}>
        <div className="clearfix">
          <Tags tags={post.metadata.tags} className={classNames(PostStyles.tags)} />
          <Heading level={headingLevel} className={classNames(PostStyles.title)}>
            <Link to={`/articles/${post.slug}`}>{post.title}</Link>
          </Heading>
          <div className={classNames(PostStyles.description)}>{post.description.description}</div>
          <AsSeenOn source={post.asSeenOn} className={classNames(PostStyles.asSeenOn)} />
          {showFavoriteButton && <FavoriteButton postId={post.id} className={classNames(PostStyles.favorite)} />}
        </div>
      </div>
    </div>
  );
}

MultimediaPreviewPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    slug: PropTypes.string,
    primaryImage: PropTypes.shape({
      alt: PropTypes.string,
      media: PropTypes.shape({
        image: PropTypes.shape({}),
      }),
    }),
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        videoId: PropTypes.string,
      })
    ),
    description: PropTypes.shape({
      description: PropTypes.string,
    }),
    publishDate: PropTypes.string,
    asSeenOn: PropTypes.string,
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
  }).isRequired,
  headingLevel: PropTypes.number,
  className: PropTypes.string,
  foregroundColor: PropTypes.string,
  ssr: PropTypes.bool,
  showFavoriteButton: PropTypes.bool,
};

MultimediaPreviewPost.defaultProps = {
  headingLevel: 0,
  className: null,
  foregroundColor: '#ff2630',
  ssr: false,
  showFavoriteButton: false,
};

// Note: Fields added to this query need to be added to `gatsby-config.js` Algolia query
export const query = graphql`
  fragment MultimediaPreviewPostFields on ContentfulMultimedia {
    id
    title
    slug
    sticky
    videos {
      ...JwPlayerFields
    }
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
        ...TagsFields
      }
    }
  }
`;

export default MultimediaPreviewPost;
