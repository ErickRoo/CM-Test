import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { motion, useAnimation } from 'framer-motion';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as Styles from './carousel-stack.module.scss';

import { resetOrder } from '../utils/carousel-utils';

const motionTransition = {
  duration: 0.5,
  ease: [0.37, 0, 0.63, 1],
};

const motionOptions = {
  initial: (index = 0) => ({
    z: 0 - index * 2,
    opacity: index === 0 ? 0.95 : 0,
  }),
  shift: (offset = 0) => ({
    opacity: offset < 3 ? 1 : 0,
    scale: 1 - offset * 0.1,
    y: -100 * offset,
    z: -60 * offset,
    transition: motionTransition,
  }),
  fadeOutFront: {
    opacity: 0,
    scale: 1.25,
    y: 100,
    z: 60,
    transition: motionTransition,
  },
  fadeInFront: {
    opacity: [0, 1],
    scale: [1.25, 1],
    y: [100, 0],
    z: [60, 0],
    transition: {
      ...motionTransition,
      times: [0, 1],
    },
  },
};

const motionShift = (index, position, offset, max) => {
  const next = resetOrder(index - (position + offset), max);
  let response = motionOptions.shift(next);

  if (offset < 0 && next === 0) {
    response = motionOptions.fadeInFront;
  } else if (offset > 0 && next === max - 1) {
    response = motionOptions.fadeOutFront;
  }

  return response;
};

function CarouselStack({ id, className, listItems, onUpdatePosition }) {
  const controls = useAnimation();
  const [position, setPosition] = useState(0);
  const [moving, setMoving] = useState(null);

  useEffect(() => {
    setPosition(0);
    controls.start(motionOptions.shift);
  }, [id]);

  const handleSlideCard = async (ev) => {
    if (moving) return;
    const { value = '' } = ev?.target?.attributes?.getNamedItem('aria-label') || {};

    const max = listItems?.length || 0;
    const offset = (value === 'move-left' && -1) || (value === 'move-right' && 1) || 0;
    const shift = resetOrder(position + offset, max);
    setPosition(shift);
    onUpdatePosition(shift);

    setMoving(true);
    await controls.start((index) => motionShift(index, position, offset, max));
    setMoving(false);
  };

  return (
    <div className={classNames(Styles.root, className)}>
      <ul className={Styles.carousel}>
        {listItems?.map(({ key, oneItem }, index) => {
          const image = getImage(oneItem?.primaryImage?.gatsbyImageData);

          return (
            <motion.li
              key={key}
              className={Styles.carouselItem}
              custom={index}
              animate={controls}
              initial={motionOptions.initial}
            >
              <GatsbyImage image={image} alt={oneItem?.primaryImage?.alt || ''} />
            </motion.li>
          );
        })}
      </ul>
      <section className={Styles.buttons}>
        <button type="button" aria-label="move-left" onClick={handleSlideCard} />
        <button type="button" aria-label="move-right" onClick={handleSlideCard} />
      </section>
    </div>
  );
}

CarouselStack.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      oneItem: PropTypes.shape({}),
    })
  ).isRequired,
  onUpdatePosition: PropTypes.func,
};

CarouselStack.defaultProps = {
  id: null,
  className: null,
  onUpdatePosition: () => {},
};

export default CarouselStack;
