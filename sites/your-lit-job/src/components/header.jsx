import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { useWindowSize } from '@react-hook/window-size';
import * as Styles from './header.module.scss';
import { trackEvent } from '../utils/track';
import Profile from './profile';
import Avatar from './avatar';
import ModalProfile from './modal-profile';
import breakpoints from '../utils/breakpoints';
import { defaultUsername } from '../pages/profile';
import { useAuth } from '../contexts/AuthContext';
import IsLoaded from './is-loaded';

function Header() {
  const { profile } = useAuth();
  const windowSize = useWindowSize();

  const trackClick = (label) => {
    trackEvent('Menu Click', 'Navigation Action Taken', label);
  };

  const [showModal, setShowModal] = React.useState(false);

  function toggleShow() {
    setShowModal(!showModal);
  }

  // close profile if user resizes window to desktop
  React.useEffect(() => {
    if (window.matchMedia(breakpoints.lg).matches) {
      setShowModal(false);
    }
  }, [windowSize]);

  return (
    <>
      <header className={Styles.root}>
        <Link
          className={Styles.logo}
          to="/"
          onClick={() => {
            trackEvent('Menu Click', 'Logo');
          }}
        >
          <StaticImage src="../assets/global/logo.png" alt="Your Hot Job" loading="eager" placeholder="none" />
        </Link>

        <Link className={Styles.search} to="/search" />

        <IsLoaded visibility>
          <div className={Styles.profileNav}>
            <Link to="/profile" className={Styles.profileIcon} onClick={() => trackClick('Profile')} />

            <div className={Styles.profileToggle}>
              <button type="button" onClick={toggleShow} className={Styles.avatarButton}>
                <Avatar className={Styles.profileAvatar} avatar={profile.avatar} />
              </button>
              <p className={Styles.profileName}>{profile.username || defaultUsername}</p>
            </div>
          </div>
        </IsLoaded>
      </header>
      <IsLoaded visibility>
        <Profile className={Styles.profile} />
        <ModalProfile
          open={showModal}
          showClose
          close={() => {
            return setShowModal(false);
          }}
        />
      </IsLoaded>
    </>
  );
}

export default Header;
