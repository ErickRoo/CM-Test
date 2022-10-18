import React from 'react';
import PropTypes from 'prop-types';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import { AnimatePresence, motion } from 'framer-motion';
import * as Styles from './profile-recent-badge.module.scss';

const motionOptions = {
  hide: {
    opacity: 0,
    scale: 0,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      ease: [0.37, 0, 0.63, 1],
      duration: 0.3,
    },
  },
  move: {
    x: [-64, 0],
    transition: {
      ease: [0.37, 0, 0.63, 1],
      times: [0, 1],
      duration: 0.3,
    },
  },
  zoom: {
    opacity: [0, 1],
    scale: [0, 1],
    transition: {
      ease: [0.37, 0, 0.63, 1],
      times: [0, 1],
      duration: 1,
    },
  },
};

function ProfileRecentBadge({ badge, isChange, index }) {
  const image = getImage(badge.gImage.gatsbyImageData);
  let animate = 'show';
  if (isChange) animate = index !== 0 ? 'move' : 'zoom';

  return (
    <AnimatePresence>
      <motion.div
        key={animate !== 'show' && badge.id}
        className={Styles.root}
        variants={motionOptions}
        initial="initial"
        animate={animate}
        exit="exit"
      >
        <GatsbyImage alt={badge.alt} image={image} />
      </motion.div>
    </AnimatePresence>
  );
}

ProfileRecentBadge.propTypes = {
  badge: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    alt: PropTypes.string,
    gImage: PropTypes.shape({
      gatsbyImageData: PropTypes.shape({}),
    }),
  }),
  isChange: PropTypes.bool,
  index: PropTypes.number,
};

ProfileRecentBadge.defaultProps = {
  badge: PropTypes.shape({
    name: null,
    id: '',
    alt: '',
    gImage: null,
  }),
  isChange: false,
  index: 0,
};

export default ProfileRecentBadge;
