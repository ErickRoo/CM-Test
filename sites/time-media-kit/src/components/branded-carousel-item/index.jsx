/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import classNames from 'classnames/bind';
import ScrollReveal from '../scroll-reveal';
import Image from '../image';
import DownloadButton from '../download-button';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function BrandedCarouselItem({ index, heading, description, image, downloadText, downloadUrl, active }) {
  return (
    <div className={cx('BrandedCarouselItem', { active })}>
      <Image image={image} lazy={index !== 0} />
      <div className={cx('overlay')} />
      <div className={cx('content')}>
        <ScrollReveal>
          <div className={cx('text')}>
            <h3 className={cx('heading')}>{heading}</h3>
            <div className={cx('description')}>{description}</div>
          </div>
          {downloadUrl && downloadText && <DownloadButton url={downloadUrl} text={downloadText} />}
        </ScrollReveal>
      </div>
    </div>
  );
}

export default BrandedCarouselItem;
