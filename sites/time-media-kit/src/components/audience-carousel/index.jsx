import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { StaticImage } from 'gatsby-plugin-image';
import Image from '../image';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function AudienceCarousel({ title, footnote, number, genderChart, ageChart }) {
  const [activeItem, setActiveItem] = useState(0);
  const carouselRef = useRef();
  const itemRefs = [ useRef(), useRef(), useRef() ];

  const handleSelectorClick = (index) => {
    const item = itemRefs[index].current;
    carouselRef.current.scroll({ left: item.offsetLeft, behavior: 'smooth' });
  };

  const renderChart = (image, index) => {
    return (
      <div ref={itemRefs[index]} className={cx('item', 'chart')} data-index={index}>
        <Image image={image} />
      </div>
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { target } = entry;

          if (entry.intersectionRatio >= 0.5) {
            setActiveItem(parseInt(target.dataset.index, 10));
          }
        });
      },
      { root: carouselRef.current, threshold: 0.5 }
    );

    itemRefs.forEach((itemRef) => {
      observer.observe(itemRef.current);
    });
  });

  return (
    <div className={cx('AudienceCarousel')}>
      <div ref={carouselRef} className={cx('carousel')}>
        <div ref={itemRefs[0]} className={cx('item', 'text')} data-index="0">
          <div className={cx('title')}>{title}<sup>{footnote}</sup></div>
          <div className={cx('info')}>
            <div className={cx('icon')}>
              <StaticImage src="../../images/house.png" alt="" />
            </div>
            <div>
              <div className={cx('number')}>{number}</div>
              <div className={cx('label')}>Average Yearly HHI</div>
            </div>
          </div>
        </div>
        {renderChart(genderChart, 1)}
        {renderChart(ageChart, 2)}
      </div>
      <div className={cx('itemSelectors')}>
        <div className={cx('itemSelector', { active: activeItem === 0 })} onClick={() =>  handleSelectorClick(0)} />
        <div className={cx('itemSelector', { active: activeItem === 1 })} onClick={() =>  handleSelectorClick(1)} />
        <div className={cx('itemSelector', { active: activeItem === 2 })} onClick={() =>  handleSelectorClick(2)} />
      </div>
    </div>
  );
}

export default AudienceCarousel;
