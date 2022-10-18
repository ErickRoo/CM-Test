import React from 'react';
import classNames from 'classnames';
import * as Styles from './profile.module.scss';
import MetaTitle from '../components/meta-title';
import MetaDescription from '../components/meta-description';
import MetaKeywords from '../components/meta-keywords';
import MetaImage from '../components/meta-image';
import ColorBar from '../components/color-bar';
import GenericPageTitle from '../components/generic-page-title';
import GenericPageSubhead from '../components/generic-page-subhead';
import Avatar, { avatarList } from '../components/avatar';
import ProfileBadges from '../components/profile-badges';
import { useAuth } from '../contexts/AuthContext';
import IsUser from '../components/is-user';
import IsAnonymous from '../components/is-anonymous';
import Button from '../components/button';
import PageDimensions from '../components/page-dimensions';

export const defaultUsername = 'Me';

function Profile() {
  const { isSignedIn, setAvatar, profile } = useAuth();

  // avatar
  const initialAvatar = profile.avatar ? avatarList.findIndex((i) => i === profile.avatar) : -1;
  const [avatarIndex, setAvatarIndex] = React.useState(initialAvatar);

  function changeAvatar(changeBy) {
    let newValue;

    if (avatarIndex + changeBy === avatarList.length || avatarIndex < 0) {
      newValue = 0;
    } else if (avatarIndex + changeBy < 0) {
      newValue = avatarList.length - 1;
    } else {
      newValue = avatarIndex + changeBy;
    }

    setAvatarIndex(newValue);
    setAvatar(avatarList[newValue]);
  }

  const pageDimensions = {
    contentType: 'Profiles page',
  };

  return (
    <div className={Styles.root}>
      <PageDimensions dimensions={pageDimensions} />
      <MetaTitle title="Sign Up for a Free Account" />
      <MetaDescription description="Interactive job-education website for kids ages 8-14. Help them find their future by discovering the many paths toward a meaningful career." />
      <MetaKeywords keywords="career education,career counseling,career resources,middle school,middle schoolers,career paths,career pathways,jobs for kids,job resources for kids,job education,future careers,stem careers, steam careers,stem jobs" />
      <MetaImage />
      <ColorBar />
      <div className={classNames('container', 'container-sm', 'container-hpad-md')}>
        <GenericPageTitle>My Profile &amp; Badges</GenericPageTitle>
        <GenericPageSubhead>
          <IsUser>{isSignedIn && <div className={Styles.displayName}>Hello, {profile.username}!</div>}</IsUser>
          <IsAnonymous>
            <div className={Styles.displayName}>Hello!</div>
          </IsAnonymous>
        </GenericPageSubhead>
      </div>
      <IsUser>
        {isSignedIn && (
          <div className={Styles.avatarSelect}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              title="previous avatar"
              className={classNames(Styles.selectButton, Styles.selectButtonL)}
              type="button"
              onClick={() => changeAvatar(-1)}
            />
            <Avatar className={Styles.avatar} avatar={profile.avatar} />
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              title="next avatar"
              className={classNames(Styles.selectButton, Styles.selectButtonR)}
              type="button"
              onClick={() => changeAvatar(1)}
            />
          </div>
        )}
      </IsUser>
      <IsAnonymous>
        <div className={Styles.avatarSelect}>
          <Avatar className={Styles.avatar} avatar="default" />
        </div>
      </IsAnonymous>
      <div>
        <Button theme="blue" width="md" size="md" type="link" action="/settings">
          Account Settings
        </Button>
      </div>

      <div className={Styles.bg}>
        <div className={classNames('container')}>
          <ProfileBadges />
        </div>
      </div>
    </div>
  );
}

export default Profile;
