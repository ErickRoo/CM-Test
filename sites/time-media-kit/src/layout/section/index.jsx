import React from 'react';
import classNames from 'classnames/bind';
import ScrollReveal from '../../components/scroll-reveal';
import DownloadButton from '../../components/download-button';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Section({ id, title, downloadText, downloadUrl, children }) {
  return (
    <div id={id} className={cx('Section')}>
      <ScrollReveal>
        <div className={cx('header')}>
          <h2>{title}</h2>
          {downloadText && downloadUrl && (
            <DownloadButton className={cx('downloadBtn')} url={downloadUrl} text={downloadText} />
          )}
        </div>
      </ScrollReveal>
      {children}
    </div>
  );
}

export default Section;
