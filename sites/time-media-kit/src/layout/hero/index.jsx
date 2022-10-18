/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import classNames from 'classnames/bind';
import ScrollReveal from '../../components/scroll-reveal';
import TimeLogo from '../../components/time-logo';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Hero({ content }) {
  const { heading, description } = content;

  return (
    <div className={cx('Hero')}>
      <div className={cx('overlay')} />
      <div className={cx('text')}>
        <ScrollReveal>
          <TimeLogo />
          <div className={cx('heading')}>{heading}</div>
          <div className={cx('description')}>{description}</div>
        </ScrollReveal>
      </div>
    </div>
  );
}

export default Hero;
