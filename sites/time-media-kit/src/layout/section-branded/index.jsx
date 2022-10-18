/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import classNames from 'classnames/bind';
import ScrollReveal from '../../components/scroll-reveal';
import Image from '../../components/image';
import BrandedCarousel from '../../components/branded-carousel';
import formatLineBreaks from '../../utils/format-line-breaks';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function BrandedSection({ content }) {
  const {headerImageMobile, headerImageDesktop, headerText, headerLogos, items } = content;

  return (
    <div className={cx('BrandedSection')}>
      <ScrollReveal threshold={0.1}>
        <div className={cx('header')}>
          <div className={cx('headerLeft')}>
            <div className={cx('headerImageMobile')}>
              <Image image={headerImageMobile} />
            </div>
            <div className={cx('headerImageDesktop')}>
              <Image image={headerImageDesktop} />
            </div>
          </div>
          <div className={cx('headerRight')}>
            <div
              className={cx('description')}
              dangerouslySetInnerHTML={{ __html: formatLineBreaks(headerText.headerText) }}
            />
            <div className={cx('logos')}>
              {headerLogos.map((logo) => (
                <Image key={logo.id} image={logo} />
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
      <BrandedCarousel items={items} />
    </div>
  );
}

export default BrandedSection;
