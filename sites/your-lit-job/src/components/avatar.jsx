import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as Styles from './avatar.module.scss';

export const avatarList = [
  'activist',
  'athletic',
  'bookworm',
  'chill',
  'gamer',
  'glam',
  'hipster',
  'prep',
  'skater',
  'street',
];
// Comment
function Avatar({ className, avatar }) {
  function findActive() {
    if (avatar) return avatarList.findIndex((item) => item === avatar);
    return -1;
  }
  const [activeAvatar, setActiveAvatar] = React.useState(findActive());

  React.useEffect(() => {
    setActiveAvatar(avatarList.findIndex((item) => item === avatar));
  }, [avatar]);

  return (
    <div className={classNames(Styles.root, className)}>
      <div className={classNames(Styles.avatarImage, Styles.defaultAvatar, activeAvatar === -1 && Styles.active)} />
      {avatarList.length > 0 &&
        avatarList.map((item, index) => {
          return (
            <div
              key={item}
              className={classNames(Styles.avatarImage, Styles[`${item}`], index === activeAvatar && Styles.active)}
            />
          );
        })}
    </div>
  );
}

Avatar.propTypes = {
  className: PropTypes.string,
  avatar: PropTypes.string,
};

Avatar.defaultProps = {
  className: null,
  avatar: '',
};

export default Avatar;
