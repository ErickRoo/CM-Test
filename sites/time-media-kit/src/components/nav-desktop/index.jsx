import React from 'react';
import classNames from 'classnames/bind';
import TimeLogo from '../time-logo';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function NavDesktop({ items }) {
  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    window.scrollTo({ top: section.offsetTop - 110, behavior: 'smooth' });
  };

  return (
    <div className={cx('NavDesktop')}>
      <ul className={cx('items')}>
        <li>
          <a href="https://time.com">
            <TimeLogo />
          </a>
        </li>
        {items.map((item) => (
          <li key={item.id}>
            <a onClick={() => handleNavClick(item.id)}>
              <span className={cx(item.icon[0])}>{item.icon[1]}</span>
              <span className={cx('itemLabel')}>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavDesktop;
