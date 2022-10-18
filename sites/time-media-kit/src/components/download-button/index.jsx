import React from 'react';
import classNames from 'classnames/bind';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function DownloadButton({ url, text }) {
  return (
    <a className={cx('DownloadButton')} target="_blank" rel="noopener noreferrer" href={url}>
      <span className={cx('material-icons-outlined')}>sim_card_download</span>
      <span className={cx('buttonText')}>{text}</span>
    </a>
  );
}

export default DownloadButton;
