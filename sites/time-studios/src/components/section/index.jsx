import React from 'react';
import classNames from 'classnames/bind';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Section({ children }) {
  return <div className={cx('Section')}>{children}</div>;
}

export default Section;
