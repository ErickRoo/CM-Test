import React from 'react';
import classNames from 'classnames/bind';
import SocialIcons from '../social-icons';
import Markdown from '../markdown';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Footer({ footerCopy }) {
  return (
    <footer className={cx('Footer')}>
      <div className={cx('inner')}>
        <div className={cx('socialIconsWrapper')}>
          <SocialIcons />
        </div>
        <div className={cx('footerCopy')}>
          <p>&copy; {new Date().getFullYear()} TIME USA, LLC. All Rights Reserved.</p>
          <Markdown>{footerCopy}</Markdown>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
