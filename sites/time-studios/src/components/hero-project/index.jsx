import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { withGlobalDispatch } from 'greenlight-core';
import { Image } from 'greenlight-shared';
import JwPlayer from '../jw-player';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function HeroProject({ project, globalDispatch }) {
  const [playbackBegun, setPlaybackBegun] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onClickPlay = () => {
    setPlaybackBegun(true);
  };

  const hideHeader = () => {
    globalDispatch({
      headerShown: false,
    });
  };

  const showHeader = () => {
    globalDispatch({
      headerShown: true,
    });
  };

  return (
    <div className={cx('HeroProject')}>
      <div className={cx('inner')}>
        {project.trailer ? (
          <div className={cx('trailer', { shown: playbackBegun })}>
            {playbackBegun ? (
              <JwPlayer
                mediaId={project.trailer}
                autoPlay
                fullbleed={false}
                controls
                mute={false}
                onPlay={hideHeader}
                onPause={showHeader}
                onPlayAttemptFailed={hideHeader}
                onComplete={showHeader}
              />
            ) : null}
          </div>
        ) : null}
        <div className={cx('poster', { shown: !playbackBegun, mounted: isMounted })}>
          <Image image={project.featuredImage} />
        </div>
        {project.trailer ? (
          <div className={cx('overlay', { shown: !playbackBegun })} onClick={onClickPlay}>
            <div className={cx('overlayInner')}>
              <div className={cx('playButtonOuter')}>
                <div className={cx('playButton')} />
              </div>
              <div className={cx('label')}>Watch the trailer</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

HeroProject.propTypes = {
  project: PropTypes.shape({
    featuredImage: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    trailer: PropTypes.string,
  }).isRequired,
  globalDispatch: PropTypes.func.isRequired,
};

export default withGlobalDispatch(HeroProject);
