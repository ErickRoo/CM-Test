import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import classNames from 'classnames';
import * as PostStyles from './post.module.scss';
import * as Styles from './post-preview-post.module.scss';
import Heading from './heading';
import VideoPlayer from './video-player';
import { isAbsoluteUrl } from '../utils/url';
import Button from './button';
import { getGatsbyImage } from '../utils/image';

function PostPreviewPost({ post, headingLevel, className, ssr }) {
  const wrapLink = (content) => {
    if (post.link) {
      if (isAbsoluteUrl(post.link)) {
        return <a href={post.link}>{content}</a>;
      }
      return <Link to={post.link}>{content}</Link>;
    }

    return content;
  };

  const primaryImage = getGatsbyImage(post.primaryImage);

  const hoverOverlay =
    !post.video && post.link ? (
      <div className={classNames(PostStyles.primaryImageHover)}>
        <Button size="md" type="div" action={null} theme="green" width="md">
          Read
        </Button>
      </div>
    ) : null;

  return (
    <div className={classNames(className)}>
      <div className={classNames(PostStyles.primaryImageContainer, Styles.primaryImageContainer)}>
        {!post.video &&
          wrapLink(
            <>
              {primaryImage && (
                <GatsbyImage
                  image={primaryImage}
                  alt={post.primaryImage.alt}
                  className={classNames(PostStyles.primaryImage)}
                />
              )}
              {hoverOverlay}
            </>
          )}

        {post.video && !ssr && (
          <VideoPlayer mediaId={post.video.videoId} rounded={!post.subhead && !post.description ? 'all' : 'top'} />
        )}
      </div>
      {(post.subhead || (post.description && post.description.description)) && (
        <div className={classNames(PostStyles.content, 'container container-pad-lg')}>
          <div>
            {post.subhead && (
              <Heading level={headingLevel + 1} className={classNames(PostStyles.subhead)}>
                {post.subhead}
              </Heading>
            )}
            {post.title && (
              <Heading level={headingLevel} className={classNames(PostStyles.title)}>
                {wrapLink(post.title)}
              </Heading>
            )}
            {post.description && post.description.description && (
              <div className={classNames(PostStyles.description)}>{post.description.description}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

PostPreviewPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    subhead: PropTypes.string,
    description: PropTypes.shape({
      description: PropTypes.string,
    }),
    primaryImage: PropTypes.shape({
      alt: PropTypes.string,
      media: PropTypes.shape({
        image: PropTypes.shape({}),
      }),
    }),
    publishDate: PropTypes.string,
    video: PropTypes.shape({
      videoId: PropTypes.string,
    }),
    link: PropTypes.string,
  }).isRequired,
  headingLevel: PropTypes.number,
  className: PropTypes.string,
  ssr: PropTypes.bool,
};

PostPreviewPost.defaultProps = {
  headingLevel: 0,
  className: null,
  ssr: false,
};

export const query = graphql`
  fragment PostPreviewPostFields on ContentfulPost {
    id
    title
    slug
    sticky
    subhead
    publishDate
    link
    description {
      description
    }
    primaryImage {
      alt
      media {
        image: gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.5)
      }
    }
    video {
      ...JwPlayerFields
    }
  }
`;

export default PostPreviewPost;
