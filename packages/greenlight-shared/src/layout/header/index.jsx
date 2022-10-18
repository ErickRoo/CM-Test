import React from 'react';
import classNames from 'classnames/bind';
import TimeLogo from '../../components/icons/time-logo';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx('Header')}>
      <div className={cx('headerContainerInner')}>
        <a className={cx('logo')} href="https://time.com">
          <TimeLogo />
        </a>
      </div>
    </div>
  );
}

export default Header;
