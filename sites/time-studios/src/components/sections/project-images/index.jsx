import React from 'react';
import classNames from 'classnames/bind';
import { Image } from 'greenlight-shared';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function SectionProjectImages({ images }) {
  const imagesList = images;
  // const imagesList = [images[0], images[1], images[2]];

  return (
    <div className={cx('SectionProjectImages')}>
      <div className={cx('inner')}>
        <div className={cx('imagesWrapper', `images${imagesList.length}`)}>
          {imagesList.map((image) => {
            return (
              <div key={image.title} className={cx('image')}>
                <Image image={image} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SectionProjectImages;
