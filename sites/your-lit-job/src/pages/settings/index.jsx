import React from 'react';
import { Link } from 'gatsby';
import { useAuth } from '../../contexts/AuthContext';
import RequireUser from '../../components/require-user';
import * as Styles from './index.module.scss';
import ColorBar from '../../components/color-bar';
import GenericPageTitle from '../../components/generic-page-title';
import Button from '../../components/button';
import PageDimensions from '../../components/page-dimensions';

function Index() {
  const { isSignedIn, profile } = useAuth();

  const pageDimensions = {
    contentType: 'settings',
  };

  return (
    <div className={Styles.root}>
      <RequireUser to="/sign-in">
        <PageDimensions dimensions={pageDimensions} />
      </RequireUser>
      <ColorBar />
      <GenericPageTitle>Account Settings</GenericPageTitle>
      {isSignedIn && (
        <div className={Styles.body}>
          <b>Username:</b> {profile.username}
        </div>
      )}

      <div className={Styles.body}>
        <div>
          <Link as={Link} to="/settings/email" className={Styles.link}>
            Change email
          </Link>
        </div>
      </div>
      <div className={Styles.body}>
        <div>
          <Link as={Link} to="/settings/password" className={Styles.link}>
            Change password
          </Link>
        </div>
      </div>
      <div className={Styles.body}>
        <Button theme="green" width="lg" size="md" type="link" action="/profile">
          Back to My Profile &amp; Badges
        </Button>
      </div>
    </div>
  );
}

export default Index;
