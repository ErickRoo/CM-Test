/* eslint-disable no-underscore-dangle */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import * as Styles from './slider-icons.module.scss';

import SliderSpriteAnimation from '../SliderSpriteAnimation';
import SliderBackgroundIcons from '../SliderBackgroundIcons';

const setMotion = {
  scale: (scale) => ({ scale }),
  opacity: (opacity) => ({ opacity }),
  left: (left) => ({ left: `${left}%` }),
  exit: () => ({
    opacity: 0,
    transition: {
      duration: 0,
    },
  }),
};

const motionPreviousSprite = {
  scale: [1, 1.2, 1],
  transition: {
    times: [0, 0.5, 1],
    duration: 0.8,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

const motionShowIconSelected = (showIcon = false, custom = false) => ({
  opacity: showIcon ? 1 : 0,
  pointerEvents: showIcon ? 'all' : 'none',
  transition: {
    duration: custom !== 0 ? 0.25 : 0,
    ease: 'easeIn',
  },
});

function SliderIcons({ qid, onSelect }) {
  const { allImgsIcons } = useStaticQuery(
    graphql`
      query QUERY_SLIDER_ICONS {
        allImgsIcons: allFile(
          filter: { relativePath: { regex: "/components/slider-icons/" } }
          sort: { order: ASC, fields: name }
        ) {
          nodes {
            ...LocalFileFragmentWo
          }
        }
      }
    `
  );
  const allIcons = allImgsIcons.nodes;
  const allColorIcons = allIcons.map((item, index) => ({ ...item, pos: index })).filter((_, index) => index % 2 === 0);

  const [answered, setAnswered] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [iconSelectedNumber, setIconSelectedNumber] = useState(0);
  const [showSpriteAnimation, setShowSpriteAnimation] = useState(false);
  const [mouseMoveOnSlider, setMouseMoveOnSlider] = useState(null);
  const [cancelMotionOneIcon, setCancelMotionOneIcon] = useState(false);

  const refIconSection = useRef();
  const controls = useAnimation();

  const handleSlideClickStart = () => {
    controls.stop();
    controls.set(setMotion.scale(1));

    setShowSpriteAnimation(false);
    setCancelMotionOneIcon(true);
  };

  const handleSlideChanging = async ({ target }) => {
    const svalue = target.valueAsNumber;
    const rounded = Math.round(svalue / 10);

    setSliderValue(answered && svalue < 5 ? 10 : svalue);
    setIconSelectedNumber(answered && rounded < 1 ? 1 : rounded);
    controls.set(setMotion.left(svalue * 2));
  };

  const handleSlideClickEnd = async ({ target }) => {
    const svalue = answered && target.valueAsNumber < 5 ? 10 : target.valueAsNumber;
    const rounded = Math.round(svalue / 10);

    setSliderValue(rounded * 10);
    setIconSelectedNumber(rounded);
    await controls.start(setMotion.left(rounded * 20));
    if (rounded > 0) {
      setAnswered(true);
      controls.start(motionPreviousSprite);
      setShowSpriteAnimation(true);
    }

    onSelect({ qid, answer: rounded });
    setCancelMotionOneIcon(false);
  };

  const handleKeyDown = (ev) => ev.preventDefault();

  const handleSelect = async (answer) => {
    controls.stop();
    controls.set(setMotion.scale(1));

    setShowSpriteAnimation(false);

    setSliderValue(answer * 10);
    setIconSelectedNumber(answer);
    await controls.start(setMotion.left(answer * 20));
    if (answer > 0) {
      setAnswered(true);
      controls.start(motionPreviousSprite);
      setShowSpriteAnimation(true);
    }

    onSelect({ qid, answer });
  };

  const handleSpriteAnimationEnd = () => {
    setShowSpriteAnimation(false);
    controls.stop();
    controls.start(setMotion.scale(1));
  };

  return (
    <div
      className={Styles.root}
      onMouseEnter={() => setCancelMotionOneIcon(false)}
      onMouseLeave={() => setCancelMotionOneIcon(true)}
    >
      <section>
        <input
          className={Styles.inputRange}
          type="range"
          min="0"
          max="50"
          onMouseDown={handleSlideClickStart}
          onTouchStart={handleSlideClickStart}
          onChange={handleSlideChanging}
          onMouseUp={handleSlideClickEnd}
          onTouchEnd={handleSlideClickEnd}
          onKeyDown={handleKeyDown}
          onMouseMove={setMouseMoveOnSlider}
          value={sliderValue}
        />
        <div ref={refIconSection} className={Styles.iconSelect}>
          <motion.div animate={controls}>
            <AnimatePresence>
              {allColorIcons.map((icon, index) => (
                <motion.img
                  key={icon?.id}
                  alt={icon?.alt}
                  src={icon?.src}
                  initial={setMotion.opacity(0)}
                  animate={motionShowIconSelected(index === iconSelectedNumber, index)}
                  exit={setMotion.exit()}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
        <SliderBackgroundIcons
          qid={qid}
          allIcons={allIcons}
          onSelect={handleSelect}
          mouseMoveOnSlider={mouseMoveOnSlider}
          cancelMotionOneIcon={cancelMotionOneIcon}
        />
        <div>
          {showSpriteAnimation && (
            <SliderSpriteAnimation
              key={qid}
              qid={qid}
              imageDelay={0.25}
              leftPositionIcon={sliderValue}
              imageIcon={allColorIcons[iconSelectedNumber]}
              onEndAnimation={handleSpriteAnimationEnd}
            />
          )}
        </div>
      </section>
    </div>
  );
}

SliderIcons.propTypes = {
  qid: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

SliderIcons.defaultProps = {
  qid: '',
};

export default SliderIcons;
