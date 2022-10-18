import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-unresolved
import { useLocation } from '@reach/router';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import * as Styles from './layout.module.scss';
import Header from './header';
import Footer from './footer';
import Nav from './nav';
import BadgeNotifications from './sections/BadgeNotifications';
import favIconPng from '../assets/global/favicon.png';
import favIcon from '../assets/global/favicon.ico';
import ModalQuestionnaire from './modal-questionnaire';
import {
  showQuestionnaire as siteConfigShowQuestionnaire,
  consumablesForQuestionnaire as siteConfigConsumablesForQuestionnaire,
} from '../../site-config';
import { useSite } from '../contexts/SiteContext';
import { useAuth } from '../contexts/AuthContext';
import OneTrust from './one-trust';

function Layout({ children }) {
  const location = useLocation();
  const main = useRef();
  const { setBack } = useSite();
  const { profile } = useAuth();

  // Determine if the user is going back for the destination page
  // Specifically used on index page to retain existing scroll position for users
  useEffect(() => {
    setBack(false);
  }, [location]);

  const onPopState = () => {
    setBack(true);
  };

  useEffect(() => {
    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  // Show questionnaire modal
  const [showQuestionnaire, setShowQuestionnaire] = React.useState(false);

  useEffect(() => {
    if (
      location.pathname.split('/')[2] !== 'skills-explorer' &&
      siteConfigShowQuestionnaire &&
      !profile.takenQuestionnaire &&
      profile.consumedContent.length >= siteConfigConsumablesForQuestionnaire &&
      profile.completedSkills
    ) {
      setShowQuestionnaire(true);
    }
  }, [location]);

  return (
    <>
      <ModalQuestionnaire
        open={showQuestionnaire}
        showClose
        close={() => {
          return setShowQuestionnaire(false);
        }}
      />
      <div className={classNames(Styles.root)}>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,800;0,900;1,400;1,500;1,600;1,800;1,900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href={favIcon} />
          <link rel="icon" type="image/png" sizes="32x32" href={favIconPng} />
        </Helmet>
        <div className={Styles.sidebar}>
          <div className={Styles.sidebarScroll}>
            <div className={Styles.sidebarInner}>
              <div className={Styles.header}>
                <Header />
              </div>
              <div className={Styles.nav}>
                <Nav />
              </div>
            </div>
          </div>
          <BadgeNotifications />
        </div>
        <main className={Styles.main} ref={main}>
          {children}
          <Footer />
        </main>
        <OneTrust />
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
