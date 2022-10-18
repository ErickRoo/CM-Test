import React from 'react';
import classNames from 'classnames/bind';
import { Image } from 'greenlight-shared';
import SocialIcons from '../social-icons';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function HeroContact({ content }) {
  return (
    <div className={cx('HeroContact')}>
      <div className={cx('inner')}>
        <div className={cx('poster')}>
          <Image image={content.heroBackgroundImage} />
        </div>
        <div className={cx('overlay')}>
          <div className={cx('overlayInner')}>
            <h1>Contact Us</h1>
            <span dangerouslySetInnerHTML={{ __html: content.contactCopy.contactCopy }} />
            <h2>Follow us on social</h2>
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroContact;
