import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import * as Styles from './favorite-button.module.scss';

const motionOptions = {
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  visible: () => ({
    opacity: 1,
    pointerEvents: 'auto',
    transition: {
      ease: 'easeIn',
    },
  }),
};

const motionPathOptions = {
  inactiveNormal: {
    fill: '#00000000',
    stroke: '#000',
  },
  inactiveCorner: {
    fill: '#00000000',
    stroke: '#fff',
  },
  active: {
    fill: '#ff0000ff',
    stroke: '#000',
  },
};

function FavoriteButton({ postId, corner, size }) {
  const { isLoaded, isSignedIn, profile, setFavoriteContent } = useAuth();
  const [active, setActive] = useState(false);

  const initializeFn = () => {
    const foundProp = Object.prototype.hasOwnProperty.call(profile, 'favoriteContent');
    if (!foundProp || !(profile.favoriteContent.length > 0)) return;

    const found = profile.favoriteContent.find((oneId) => oneId === postId);
    setActive(found);
  };

  useEffect(() => {
    initializeFn();
  }, [isLoaded]);

  const handleClick = () => {
    setFavoriteContent(postId, !active);
    setActive(!active);
  };

  if (!isSignedIn) {
    return null;
  }

  const inactiveSelected = corner ? 'inactiveCorner' : 'inactiveNormal';
  return (
    <motion.div
      className={classNames(
        Styles.root,
        Styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
        corner && Styles.corner
      )}
      initial="hidden"
      animate={isSignedIn ? 'visible' : 'hidden'}
      variants={motionOptions}
    >
      <button type="button" aria-label="favorite-icon" className={Styles.button} onClick={handleClick}>
        <motion.svg
          viewBox="0 0 18 16"
          className={Styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          initial={inactiveSelected}
          animate={active ? 'active' : inactiveSelected}
        >
          <motion.path
            variants={motionPathOptions}
            d="M 9.04 2.55 C 8.16 1.23 3.62 -0.6 1.33 3.88 C 0.69 5.75 0.99 7.16 2.47 8.86 L 7.64 13.85 C 8.43 14.87 9.64 14.89 10.47 13.86 L 15.51 8.87 C 17.04 7.21 17.46 5.76 16.76 3.87 C 14.36 -0.59 9.68 1.28 9.04 2.55 Z"
          />
        </motion.svg>
      </button>
    </motion.div>
  );
}

FavoriteButton.propTypes = {
  postId: PropTypes.string.isRequired,
  corner: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium']),
};

FavoriteButton.defaultProps = {
  corner: false,
  size: 'medium',
};

export default FavoriteButton;
