import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import classNames from 'classnames';
import VideoPlayer from './video-player';
import * as PostStyles from './post.module.scss';
import * as Styles from './meetup-preview-post.module.scss';
import Heading from './heading';
import Date from './date';
import Button from './button';
import FavoriteButton from './favorite-button';
import { getGatsbyImage } from '../utils/image';
import ContentTypeIcon from './content-type-icon';

function MeetupPreviewPost({ post, headingLevel, className, ssr, showFavoriteButton }) {
  const wrapLink = (content) => {
    if (post.meetingLink && !post.video) {
      return <a href={post.meetingLink}>{content}</a>;
    }

    return content;
  };

  const postImage = () => {
    if (post.video) {
      return (
        <div className={classNames(PostStyles.primaryImageContainer, Styles.primaryImageContainer)}>
          {!ssr && <VideoPlayer mediaId={post.video.videoId} rounded="top" />}
        </div>
      );
    }

    const primaryImage = getGatsbyImage(post.primaryImage);

    return (
      <div className={classNames(PostStyles.primaryImageContainer, Styles.primaryImageContainer)}>
        <ContentTypeIcon type={post.internal.type} corner />
        {wrapLink(
          <>
            {primaryImage && (
              <GatsbyImage
                image={primaryImage}
                alt={post.primaryImage.alt}
                className={classNames(PostStyles.primaryImage)}
              />
            )}
            {post.meetingLink && (
              <div className={classNames(PostStyles.primaryImageHover)}>
                <Button size="md" type="div" theme="green" width="md">
                  Join
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className={classNames(className)}>
      {showFavoriteButton && <FavoriteButton postId={post.id} corner />}
      {postImage()}
      <div className={classNames(PostStyles.content, 'container container-pad-lg')}>
        <div>
          <Date
            className={classNames(PostStyles.eventDate, Styles.eventDate)}
            date={post.eventDate}
            format="writtenDateTime"
          />
          <Heading level={headingLevel} className={classNames(PostStyles.title)}>
            {wrapLink(post.title)}
          </Heading>
          <div className={classNames(PostStyles.description)}>{post.description.description}</div>
          {post.meetingLink && !post.video && (
            <a className={Styles.meetingLink} href={post.meetingLink}>
              {post.meetingLink}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

MeetupPreviewPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    path: PropTypes.string,
    eventDate: PropTypes.string,
    description: PropTypes.shape({
      description: PropTypes.string,
    }),
    primaryImage: PropTypes.shape({
      alt: PropTypes.string,
      media: PropTypes.shape({
        image: PropTypes.shape({}),
      }),
    }),
    video: PropTypes.shape({
      videoId: PropTypes.string,
    }),
    meetingLink: PropTypes.string,
    internal: PropTypes.shape({
      type: PropTypes.string,
    }),
  }).isRequired,
  headingLevel: PropTypes.number,
  className: PropTypes.string,
  ssr: PropTypes.bool,
  showFavoriteButton: PropTypes.bool,
};

MeetupPreviewPost.defaultProps = {
  headingLevel: 0,
  className: null,
  ssr: false,
  showFavoriteButton: false,
};

// Note: Fields added to this query need to be added to `gatsby-config.js` Algolia query
export const query = graphql`
  fragment MeetupPreviewPostFields on ContentfulMeetup {
    id
    title
    slug
    sticky
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
      ...JwPlayerFields
    }
  }
`;

export default MeetupPreviewPost;
