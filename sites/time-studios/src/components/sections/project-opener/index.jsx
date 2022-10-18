import React from 'react';
import classNames from 'classnames/bind';
import Markdown from '../../markdown';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function SectionProjectOpener({ title, description }) {
  return (
    <div className={cx('SectionProjectOpener')}>
      <div className={cx('inner')}>
        <div className={cx('titleWrapper')}>
          <h1>{title}</h1>
        </div>
        <div className={cx('descriptionWrapper')}>
          <Markdown>{description}</Markdown>
        </div>
      </div>
    </div>
  );
}

export default SectionProjectOpener;
