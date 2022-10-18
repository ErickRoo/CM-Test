import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import VideoPlayer from './video-player';
import * as Styles from './article-videos.module.scss';

export function hasVideos(videos) {
  return videos && videos.length;
}

function ArticleVideos({ videos, className }) {
  if (!hasVideos(videos)) {
    return null;
  }

  return (
    <div className={classNames(Styles.root, className)}>
      <ol className={Styles.videos}>
        {videos.map((video) => {
          return (
            <li key={video.id}>
              <VideoPlayer
                mediaId={video.videoId}
                className={classNames(Styles.player, 'image-shadow', 'image-shadow-aqua')}
                consumable={false}
              />
              {video.description && <div className={Styles.description}>{video.description.description}</div>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

ArticleVideos.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      videoId: PropTypes.string,
      description: PropTypes.shape({
        description: PropTypes.string,
      }),
    })
  ).isRequired,
  className: PropTypes.string,
};

ArticleVideos.defaultProps = {
  className: null,
};

export const query = graphql`
  fragment ArticleVideosFields on ContentfulVideo {
    ...JwPlayerFields
    description {
      description
    }
  }
`;

export default ArticleVideos;
