import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Image } from 'greenlight-shared';
import JwPlayer from '../jw-player';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function HeroHome({ headline, videoId, poster }) {
  return (
    <div className={cx('HeroHome')}>
      <div className={cx('inner')}>
        {/* this 'null' value in quotes is an intentional work-around for optional fields coming through graphql */}
        {/* TODO: fix this the right way */}

        {videoId !== 'null' ? (
          <div className={cx('video')}>
            <JwPlayer mediaId={videoId} autoPlay fullbleed mute repeat />
          </div>
        ) : null}

        {/* this 'null' value in quotes is an intentional work-around for optional fields coming through graphql */}
        {videoId === 'null' && poster ? (
          <div className={cx('poster')}>
            <Image image={poster} />
          </div>
        ) : null}

        <div className={cx('overlay')}>
          <div className={cx('overlayInner')}>
            <h1>{headline}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

HeroHome.propTypes = {
  headline: PropTypes.string.isRequired,
};

export default HeroHome;
