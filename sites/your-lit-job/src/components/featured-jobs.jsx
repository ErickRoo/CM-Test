import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useWindowSize } from '@react-hook/window-size';
import { motion, useAnimation } from 'framer-motion';
import * as Styles from './featured-jobs.module.scss';

import { resetOrder, shiftChildNodesFrReference, getMinimalItems, getContainerWidth } from '../utils/carousel-utils';
import Heading from './heading';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import CardJob from './card-job';
import { trackEvent } from '../utils/track';

const motionTransition = {
  duration: 0.3,
  durationMs: 600,
  ease: 'easeOut',
};

const motionOptions = {
  initialOpacity: {
    opacity: 0,
  },
  showOpacity: {
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

const getPositionX = (offset, width, { left = false, right = false } = {}) => {
  let target = 2;
  if (left) target = 1;
  else if (right) target = 3;
  return {
    x: offset - target * width,
    transition: motionTransition,
  };
};

const getMove = (target, max, index) => {
  let opacity = 0;
  let scale = 0.8;
  if (resetOrder(target, max) === index) {
    opacity = 1;
    scale = 1;
  } else if (resetOrder(target - 1, max) === index || resetOrder(target + 1, max) === index) {
    opacity = 0.4;
  }
  return {
    opacity,
    scale,
    transition: motionTransition,
  };
};

function FeaturedJobs({ jobs, foregroundColor, showHeatHighlight, headingLevel, title, className }) {
  const carouselRef = useRef(null);
  const carouselControls = useAnimation();
  const itemsControls = useAnimation();
  const [offsetX, setOffsetX] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardPos, setCardPos] = useState(2);
  const [moving, setMoving] = useState(false);
  const [winX] = useWindowSize();
  const minimalList = getMinimalItems(jobs);

  const handleResize = (newPosition) => {
    if (!(minimalList?.length > 0)) return;

    const containerWidth = getContainerWidth();
    const newCardWidth = containerWidth > 560 ? 470 : containerWidth - 50;
    const containerOffset = containerWidth / 2 - newCardWidth / 2;
    setCardWidth(newCardWidth);
    setOffsetX(containerOffset);

    carouselControls.set(getPositionX(containerOffset, newCardWidth));
    itemsControls.set(getMove.bind(this, newPosition, minimalList.length));
    carouselControls.start(motionOptions.showOpacity);
  };

  useEffect(() => {
    setCardPos(2);
    handleResize(2);
  }, [jobs]);

  useEffect(() => {
    handleResize(cardPos);
  }, [winX]);

  const handleSlideCard = (ev) => {
    if (moving) return;
    const { value = '' } = ev.target.attributes.getNamedItem('aria-label') || {};

    const motionObject = { left: false, right: false, shiftPositions: cardPos };
    if (value === 'move-left') {
      motionObject.left = true;
      motionObject.shiftPositions -= 1;
    } else if (value === 'move-right') {
      motionObject.right = true;
      motionObject.shiftPositions += 1;
    }

    setMoving(true);
    setCardPos(resetOrder(motionObject.shiftPositions, minimalList.length));
    itemsControls.start(getMove.bind(this, motionObject.shiftPositions, minimalList.length));
    carouselControls.start(getPositionX(offsetX, cardWidth, motionObject));

    setTimeout(() => {
      carouselControls.set(getPositionX(offsetX, cardWidth, 2));
      shiftChildNodesFrReference(carouselRef, motionObject);
      setMoving(false);
    }, motionTransition.durationMs);
  };

  const handleSlideCardPrev = (ev) => {
    const card = minimalList[cardPos];
    if (card.oneItem && card.oneItem.title) {
      trackEvent('Skipped', 'Jobs at a Glance', card.oneItem.title);
    }

    handleSlideCard(ev);
  };

  const handleSlideCardNext = (ev) => {
    const card = minimalList[cardPos];
    if (card.oneItem && card.oneItem.title) {
      trackEvent('Skipped', 'Jobs at a Glance', card.oneItem.title);
    }

    handleSlideCard(ev);
  };

  return (
    <div className={classNames(Styles.root, className)}>
      {title && (
        <Heading level={headingLevel} className={Styles.title}>
          {title}
        </Heading>
      )}
      <motion.ul
        className={Styles.carousel}
        ref={carouselRef}
        animate={carouselControls}
        initial={motionOptions.initialOpacity}
      >
        {minimalList.map(({ oneItem, key }, index) => (
          <motion.li
            key={key}
            style={{ width: cardWidth }}
            custom={index}
            animate={itemsControls}
            data-title={oneItem.title}
          >
            <CardJob
              job={oneItem}
              foregroundColor={foregroundColor}
              active={!moving && cardPos === index}
              showHeatHighlight={showHeatHighlight}
            />
          </motion.li>
        ))}
      </motion.ul>
      <section className={Styles.buttons}>
        <button type="button" aria-label="move-left" onClick={handleSlideCardPrev} />
        <button type="button" aria-label="move-right" onClick={handleSlideCardNext} />
      </section>
    </div>
  );
}

FeaturedJobs.propTypes = {
  className: PropTypes.string,
  foregroundColor: PropTypes.string,
  headingLevel: PropTypes.number,
  title: PropTypes.string,
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
  showHeatHighlight: PropTypes.bool,
};

FeaturedJobs.defaultProps = {
  className: null,
  foregroundColor: null,
  headingLevel: 0,
  title: null,
  showHeatHighlight: false,
};

export default FeaturedJobs;
