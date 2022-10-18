import React from 'react';
import classNames from 'classnames/bind';
import IconInstagram from '../icons/instagram';
import IconFacebook from '../icons/facebook';
import IconTwitter from '../icons/twitter';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function SocialIcons() {
  return (
    <div className={cx('SocialIcons')}>
      <ul>
        <li>
          <a href="https://instagram.com/timestudios" target="_blank" rel="noreferrer">
            <IconInstagram />
          </a>
        </li>
        <li>
          <a href="https://facebook.com/timestudios" target="_blank" rel="noreferrer">
            <IconFacebook />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/timestudiosfilm" target="_blank" rel="noreferrer">
            <IconTwitter />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SocialIcons;
