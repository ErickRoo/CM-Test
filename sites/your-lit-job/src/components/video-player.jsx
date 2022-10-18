import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import JWPlayer from '../jwplayer/jwplayer';
import * as Styles from './video-player.module.scss';
import './jw-player.scss';
// eslint-disable-next-line import/no-cycle
import { useAuth } from '../contexts/AuthContext';

const JW_DELIVERY_API_BASE = 'https://cdn.jwplayer.com/v2/media';
const JW_MAIN_PLAYER_ID = 'SYkqUHIo';
export const INTRO_VIDEO_ID = 'oy8dLaiY';

function VideoPlayer({
  mediaId,
  playerId,
  autoPlay,
  showRec,
  showAds,
  controls,
  floating,
  fullbleed,
  repeat,
  displayTitle,
  mute,
  onPlay,
  onPause,
  onPlayAttemptFailed,
  onComplete,
  onFullscreen,
  className,
  rounded,
  onReady,
  consumable,
}) {
  const { isSignedIn, setWatchedIntro, setConsumedContent, isLoaded } = useAuth();

  const configs = {
    autostart: autoPlay,
    repeat,
    controls,
    displaytitle: displayTitle,
    mute,
  };

  // This overrides any recommendations/related configs
  // that's set in the dashboard. This is for the case
  // when a particular video should not have recommendations
  // or related videos after it's done playing
  //
  // see https://developer.jwplayer.com/jwplayer/docs/jw8-player-configuration-reference#related
  // see https://developer.jwplayer.com/jwplayer/docs/jw8-player-configuration-reference#appearance
  if (!showRec || mediaId === INTRO_VIDEO_ID) {
    configs.nextUpDisplay = false;
    configs.related = { displayMode: 'none' };
  }

  if (!showAds) configs.advertising = {};

  if (!floating) configs.floating = { mode: 'never' };

  function consumeVideo(id) {
    setConsumedContent(id);
  }

  return (
    <div
      className={classNames('JxPlayer', { fullbleed }, Styles.root, className, {
        [Styles.rounded]: rounded === 'all',
        [Styles.roundedTop]: rounded === 'top',
        [Styles.roundedTopMed]: rounded === 'top-med',
      })}
    >
      {isLoaded && (
        <JWPlayer
          className={classNames('videoContainer')}
          config={configs}
          library={`https://cdn.jwplayer.com/libraries/${playerId}.js`}
          playlist={`${JW_DELIVERY_API_BASE}/${mediaId}`}
          onPlay={() => {
            if (isSignedIn) {
              if (mediaId === INTRO_VIDEO_ID) {
                setWatchedIntro(true);
              }

              if (consumable) consumeVideo(mediaId);
            }
            onPlay();
          }}
          onFullscreen={({ fullscreen }) => {
            if (fullscreen) {
              document.documentElement.setAttribute('data-fullscreen', true);
            } else {
              document.documentElement.removeAttribute('data-fullscreen');
            }
            onFullscreen();
          }}
          onPause={onPause}
          onPlayAttemptFailed={onPlayAttemptFailed}
          onComplete={onComplete}
          onReady={onReady}
        />
      )}
    </div>
  );
}

VideoPlayer.propTypes = {
  mediaId: PropTypes.string.isRequired,
  playerId: PropTypes.string,
  autoPlay: PropTypes.bool,
  showRec: PropTypes.bool,
  showAds: PropTypes.bool,
  controls: PropTypes.bool,
  floating: PropTypes.bool,
  fullbleed: PropTypes.bool,
  repeat: PropTypes.bool,
  displayTitle: PropTypes.bool,
  mute: PropTypes.bool,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onPlayAttemptFailed: PropTypes.func,
  onComplete: PropTypes.func,
  onFullscreen: PropTypes.func,
  onReady: PropTypes.func,
  className: PropTypes.string,
  rounded: PropTypes.oneOf(['all', 'top', 'top-med']),
  consumable: PropTypes.bool,
};

VideoPlayer.defaultProps = {
  playerId: JW_MAIN_PLAYER_ID,
  autoPlay: false,
  showRec: true,
  showAds: false,
  controls: true,
  floating: false,
  fullbleed: false,
  repeat: false,
  displayTitle: false,
  mute: false,
  onPlay: () => {},
  onPause: () => {},
  onPlayAttemptFailed: () => {},
  onComplete: () => {},
  onFullscreen: () => {},
  onReady: () => {},
  className: null,
  rounded: 'all',
  consumable: true,
};

export const query = graphql`
  fragment JwPlayerFields on ContentfulVideo {
    id
    videoId
  }
`;

export default VideoPlayer;
