/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import ScrollReveal from '../scroll-reveal';
import BrandedCarouselItem from '../branded-carousel-item';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function BrandedCarousel({ items }) {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className={cx('BrandedCarousel')}>
      <ScrollReveal>
        <select
          value={activeItem}
          className={cx('navMobile')}
          onChange={(e) => { setActiveItem(parseInt(e.target.value, 10)) }}
        >
          {items.map((item, index) => (
            <option key={item.id} value={index}>{item.title}</option>
          ))}
        </select>
      </ScrollReveal>
      <ScrollReveal>
        <ul className={cx('navDesktop')}>
          {items.map((item, index) => (
            <li key={item.id}>
              <a
                className={cx({ active: activeItem === index })}
                onClick={() => { setActiveItem(index)}}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </ScrollReveal>
      <div className={cx('items')}>
        {items.map((item, index) => (
          <BrandedCarouselItem
            key={item.id}
            index={index}
            heading={item.heading}
            description={item.description.description}
            image={item.image}
            downloadText={item.downloadText}
            downloadUrl={item.downloadUrl}
            active={activeItem === index}
          />
        ))}
      </div>
    </div>
  );
}

export default BrandedCarousel;
