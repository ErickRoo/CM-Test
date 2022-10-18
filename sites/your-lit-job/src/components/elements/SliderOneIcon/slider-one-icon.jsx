/* eslint-disable no-else-return */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import * as Styles from './slider-one-icon.module.scss';

const isSafari12OrLess = () => {
  if (window?.navigator?.userAgent?.length > 0) {
    const ua = window?.navigator?.userAgent;
    if (ua.indexOf('Version/') >= 0 && ua.indexOf('Safari/') >= 0) {
      const offset = ua.indexOf('Version') + 8;
      const version = ua.substring(offset);
      const version10 = parseInt(version, 10);

      return version10 <= 12;
    }
  }
  return false;
};

function SliderOneIcon({ pairIcons, mouseMoveOnSlider, cancelMotion, onSelect }) {
  const [hover, setHover] = useState(false);
  const imageRef = useRef();

  useEffect(() => {
    let isHovered = false;
    let isValidVersion = false;

    if (mouseMoveOnSlider?.type && !cancelMotion) {
      try {
        const { clientX, clientY } = mouseMoveOnSlider;
        const { left, right, top, bottom } = imageRef.current.getBoundingClientRect();
        isHovered = left < clientX && clientX < right && top < clientY && clientY < bottom;

        if (isHovered) isValidVersion = isSafari12OrLess();
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }
    if (isValidVersion) onSelect();

    setHover(isHovered);
  }, [mouseMoveOnSlider, cancelMotion]);

  const imageSelected = pairIcons[hover ? 'hover' : 'normal'];

  return (
    <div ref={imageRef} className={Styles.root}>
      <AnimatePresence>
        <motion.img
          className={classNames(Styles[hover ? 'hover' : 'normal'])}
          key={imageSelected.id}
          src={imageSelected.src}
          alt={imageSelected.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        />
      </AnimatePresence>
    </div>
  );
}

const Image = PropTypes.shape({
  id: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string,
});

SliderOneIcon.propTypes = {
  pairIcons: PropTypes.shape({
    normal: Image,
    hover: Image,
  }).isRequired,
  onSelect: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  mouseMoveOnSlider: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  cancelMotion: PropTypes.bool,
};

SliderOneIcon.defaultProps = {
  onSelect: null,
  mouseMoveOnSlider: null,
  cancelMotion: false,
};

export default SliderOneIcon;
