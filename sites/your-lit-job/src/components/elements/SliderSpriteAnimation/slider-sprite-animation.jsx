import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, useAnimation } from 'framer-motion';
import * as Styles from './slider-sprite-animation.module.scss';

const getRandomValue = (min, max, offset = 0) => {
  const newMin = min + offset;
  const newMax = max + offset;
  const value = Math.random() * (newMax - newMin) + newMin;
  return value;
};

const motionFirstOptions = () => ({
  rotate: `${getRandomValue(-40, 40)}deg`,
  opacity: 0,
  scale: 0,
});

const motionSecondOptions = (custom) => {
  const top = getRandomValue(-10, 50);

  return {
    top: [top, top - 225],
    transition: {
      delay: 0.1 + 0.2 * custom,
      duration: 2,
      times: [0, 1],
      ease: 'easeInOut',
    },
  };
};

const motionThirdOptions = (custom) => {
  const scale = 0.95 - custom * 0.05;
  const left = getRandomValue(-22, 55);
  const offset = getRandomValue(-50, 50);

  return {
    scale: [0, scale, scale, scale * 0.75],
    opacity: [0, 1, 0.75, 0],
    left: [left, left + offset],
    transition: {
      delay: 0.1 + 0.2 * custom,
      duration: 2,
      times: [0, 0.3, 0.6, 1],
      ease: 'easeInOut',
    },
  };
};

function SliderSpriteAnimation({ qid, imageIcon, imageDelay, leftPositionIcon, onEndAnimation }) {
  const controls = useAnimation();
  const offset = window?.innerWidth > 480 ? 5 : 0;

  const animationStart = async () => {
    controls.start(motionSecondOptions);
    await controls.start(motionThirdOptions);
    controls.stop();
    onEndAnimation();
  };

  useEffect(() => {
    setTimeout(() => {
      animationStart();
    }, imageDelay - 0.1 * 1000);
  }, [imageDelay]);

  return (
    <div className={Styles.root}>
      <section style={{ left: `${leftPositionIcon * 2 - offset}%` }}>
        {Array(10)
          .fill()
          .map((_, index) => {
            const key = `${qid}-animation-${imageIcon?.id}-${index}`;
            return (
              <motion.img
                key={key}
                alt={imageIcon?.alt}
                src={imageIcon?.src}
                initial={motionFirstOptions}
                animate={controls}
                custom={index}
              />
            );
          })}
      </section>
    </div>
  );
}

SliderSpriteAnimation.propTypes = {
  qid: PropTypes.string,
  imageIcon: PropTypes.shape({
    id: PropTypes.string,
    alt: PropTypes.string,
    src: PropTypes.string,
  }).isRequired,
  leftPositionIcon: PropTypes.number,
  imageDelay: PropTypes.number,
  onEndAnimation: PropTypes.func,
};

SliderSpriteAnimation.defaultProps = {
  qid: '',
  leftPositionIcon: 0,
  imageDelay: 0,
  onEndAnimation: null,
};

export default SliderSpriteAnimation;
