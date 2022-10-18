import React from 'react';
import { UseWindowDimensions } from 'greenlight-shared';
import classNames from 'classnames/bind';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Hero() {
  const { height: windowHeight } = UseWindowDimensions();

  const style = {
    height: windowHeight,
  };

  return (
    <div style={style} className={cx('Hero')}>
      <div className={cx('text')}>
        <h1 className={cx('heading')}>FAR FROM HOME</h1>
        <div className={cx('description')}>
          One year after the fall of Kabul, Afghan women are <br /> attempting to build new lives abroad
        </div>
      </div>
    </div>
  );
}

export default Hero;
