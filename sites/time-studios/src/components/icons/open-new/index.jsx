import React from 'react';
import classNames from 'classnames/bind';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function IconOpenNew() {
  return (
    <svg
      className={cx('IconOpenNew')}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      height="100%"
      width="100%"
    >
      <polygon points="28 0 28 7 36.05 7 21.333 21.718 26.282 26.667 41 11.95 41 20 48 20 48 0 28 0" />
      <polygon points="41 41 7 41 7 7 21 7 21 0 0 0 0 48 48 48 48 27 41 27 41 41" />
    </svg>
  );
}

export default IconOpenNew;
