import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames/bind';
import { withGlobalState, withGlobalDispatch } from 'greenlight-core';
import IconTimeStudios from '../icons/time-studios';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Header({ menu, page, globalState, globalDispatch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPageSlug = page.slug;
  let previousScrollY = null;

  const onScroll = () => {
    if (window.scrollY !== previousScrollY && !mobileMenuOpen) {
      // the `window.scrollY > 0` is to fix scrolling to top of page on safari, when it bounce-snaps back into place
      if (previousScrollY !== null && window.scrollY > previousScrollY && window.scrollY > 0) {
        globalDispatch({
          headerShown: false,
        });
      } else if (previousScrollY !== null && window.scrollY < previousScrollY) {
        globalDispatch({
          headerShown: true,
        });
      }
      previousScrollY = window.scrollY;
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll, true);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const setScrollLock = (locked) => {
    if (typeof window !== 'undefined') {
      if (locked) {
        document.body.classList.add('noscroll');
      } else {
        document.body.classList.remove('noscroll');
      }
    }
  };

  const onClickMenuItem = () => {
    setMobileMenuOpen(false);
    setScrollLock(false);
  };

  const onClickMenuButton = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setScrollLock(!mobileMenuOpen);
  };

  const isMenuItemActive = (itemSlug) => {
    return currentPageSlug === itemSlug;
  };

  return (
    /* TODO: why do we need to use `globalState.headerShown === false` vs `!globalState.headerShown`? the latter does not work as expected */
    <header className={cx('Header', { hidden: globalState.headerShown === false, mobileMenuOpen })}>
      <div className={cx('menuWrapper', { mobileMenuOpen })}>
        <ul>
          {menu.map((item) => {
            return (
              <li
                key={item.slug}
                className={cx({ active: isMenuItemActive(item.slug) })}
                onClick={() => {
                  onClickMenuItem();
                }}
              >
                <Link to={`/${item.slug}`}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={cx('brandingWrapper')}>
        {/* TODO!: make sure home link is correct */}
        <Link to="/">
          <IconTimeStudios />
        </Link>
      </div>
      <div className={cx('buttonMenuWrapper')}>
        <button
          type="button"
          onClick={() => {
            onClickMenuButton();
          }}
        >
          <div className={cx('hamburger', { active: mobileMenuOpen })}>
            <div className={cx('hamburgerBox')}>
              <div className={cx('hamburgerInner')} />
            </div>
          </div>
        </button>
      </div>
    </header>
  );
}

export default withGlobalState(withGlobalDispatch(Header));
