import React from 'react';
import classNames from 'classnames/bind';
import AwardGridItem from './award-grid-item';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function SectionAwardsGrid({ images }) {
  return (
    <div className={cx('SectionAwardsGrid')}>
      <div className={cx('inner')}>
        <div className={cx('grid')}>
          {images.map((image) => (
            <AwardGridItem image={image} key={image.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SectionAwardsGrid;
