import React, { Component } from 'react';
import classNames from 'classnames/bind';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);
const JW_DELIVERY_API_BASE = 'https://cdn.jwplayer.com/v2/media';
const JW_MAIN_PLAYER_ID = 'aDxCT0wO'; // Main player used for all Greenlight projects

function installPlayerScript({ playerId = JW_MAIN_PLAYER_ID, onLoadCallback }) {
  const jwPlayerScript = document.createElement('script');
  jwPlayerScript.id = `jw-player-script-${playerId}`;
  jwPlayerScript.src = `//cdn.jwplayer.com/libraries/${playerId}.js`;
  jwPlayerScript.onload = onLoadCallback;

  document.head.appendChild(jwPlayerScript);
}

function getCurriedOnLoad(existingScript, callback) {
  const previousOnload = existingScript.onload || (() => {});

  return () => {
    previousOnload();
    callback();
  };
}

export default class JwPlayer extends Component {
  constructor(props) {
    super(props);
    const { playerId = JW_MAIN_PLAYER_ID } = props;

    this.playerElement = React.createRef();
    this.initialize = this.initialize.bind(this);
    this.setupPlayer = this.setupPlayer.bind(this);
    this.scriptId = `jw-player-script-${playerId}`;
  }

  componentDidMount() {
    // If the player script has already been loaded,
    // then we can just initialize the player
    const scriptLoaded = typeof window.jwplayer !== 'undefined';

    if (scriptLoaded) {
      this.initialize();
    }

    // If the player script has not been loaded,
    // then we need to load it and then initialize
    // the player
    const existingScript = document.getElementById(this.scriptId);

    if (!existingScript) {
      installPlayerScript({
        onLoadCallback: this.initialize,
      });
      // If the player script is not loaded, but there is
      // an existing script, then we need to get the curried
      // onload function and then call it to initialize the player
      // This is under the assumption that the `onload` callback
      // was already set from another instance of the player
    } else if (existingScript && !scriptLoaded) {
      existingScript.onload = getCurriedOnLoad(existingScript, this.initialize);
    }
  }

  componentWillUnmount() {
    this.playerInstance?.remove();
  }

  setupPlayer(configs) {
    const {
      onFullScreen = () => {},
      onPlay = () => {},
      onPause = () => {},
      onPlayAttemptFailed = () => {},
      onComplete = () => {},
    } = this.props;

    if (typeof window.jwplayer !== 'undefined') {
      this.playerInstance = window.jwplayer(this.playerElement.current).setup(configs);

      this.playerInstance.on('play', onPlay);
      this.playerInstance.on('pause', onPause);
      this.playerInstance.on('playAttemptFailed', onPlayAttemptFailed);
      this.playerInstance.on('complete', onComplete);
      this.playerInstance.on('fullscreen', onFullScreen);
    }
  }

  initialize() {
    const {
      mediaId,
      autoPlay = true,
      showRec = false,
      showAds = false,
      controls = false,
      floating = false,
      repeat = false,
      displaytitle = false,
      mute = false,
    } = this.props;

    // Assume there is a playlist ID
    const configs = {
      playlist: `${JW_DELIVERY_API_BASE}/${mediaId}`,
      autostart: autoPlay,
      repeat,
      controls,
      displaytitle,
      mute,
    };

    // This overrides any recommendations/related configs
    // that's set in the dashboard. This is for the case
    // when a particular video should not have recommendations
    // or related videos after it's done playing
    //
    // see https://developer.jwplayer.com/jwplayer/docs/jw8-player-configuration-reference#related
    // see https://developer.jwplayer.com/jwplayer/docs/jw8-player-configuration-reference#appearance
    if (!showRec) {
      configs.nextUpDisplay = false;
      configs.related = { displayMode: 'none' };
    }

    if (!showAds) configs.advertising = {};

    if (!floating) configs.floating = { mode: 'never' };

    this.setupPlayer(configs);
  }

  render() {
    const { fullbleed = false } = this.props;

    return (
      <div className={cx('JwPlayer', { fullbleed })}>
        <div className={cx('videoContainer')} ref={this.playerElement} />
      </div>
    );
  }
}
