import React from 'react';
import classNames from 'classnames/bind';
import { Image } from 'greenlight-shared';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function AwardGridItem({ image }) {
  return (
    <div className={cx('AwardGridItem')}>
      <Image image={image} />
    </div>
  );
}

export default AwardGridItem;
