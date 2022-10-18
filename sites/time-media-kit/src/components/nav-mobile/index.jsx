import React from 'react';
import classNames from 'classnames/bind';
import TimeLogo from '../time-logo';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function NavDesktop({ items }) {
  const handleNavChange = (e) => {
    const section = document.getElementById(e.target.value);
    window.scrollTo({ top: section.offsetTop - 120, behavior: 'smooth' });
    e.target.value = 'label';
  };

  return (
    <div className={cx('NavMobile')}>
      <div className={cx('header')}>
        <a href="https://time.com">
          <TimeLogo />
        </a>
      </div>
      <div className={cx('dropdownWrapper')}>
        <div className={cx('dropdownOverride')}>
          <span className={cx('text')}>Skip to Section</span>
          <span className={cx('arrow')} />
        </div>
        <select
          className={cx('dropdown')}
          defaultValue="label"
          onChange={(e) => { handleNavChange(e) }}
        >
          <option value="label" disabled>
            SKIP TO SECTION
          </option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))};
        </select>
      </div>
    </div>
  );
}

export default NavDesktop;
