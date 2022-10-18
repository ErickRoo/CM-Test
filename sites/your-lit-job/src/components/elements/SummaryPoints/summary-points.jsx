import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, useAnimation } from 'framer-motion';
import classNames from 'classnames';
import * as Styles from './summary-points.module.scss';

import SummaryLineTitle from '../SummaryLineTitle';
import Heading from '../../heading';

const containerViewportOptions = {
  rootMargin: '-10% 0% -30% 0%',
  threshold: 0.1,
};

const motionFirstOptions = {
  opacity: 0,
  scale: 0,
  transition: {
    delay: 2,
  },
};

const motionSecondOptions = (custom) => ({
  opacity: [0, 1],
  scale: [0, 1],
  rotate: [`${custom % 2 === 1 ? -50 : 50}deg`, `0deg`],
  transition: {
    ease: [0.34, 1.56, 0.64, 1],
    duration: 0.5,
    delay: 0.25 + custom * 0.2,
    transition: [0, 1],
  },
});

function SummaryPoints({ id, skillsPoints }) {
  const controls = useAnimation();
  const listRef = useRef(null);
  const firstTime = useRef(false);
  const once = useRef(false);

  useEffect(() => {
    controls.set(motionFirstOptions);
    setTimeout(() => {
      firstTime.current = true;
    }, 1000);
  }, []);

  useEffect(() => {
    controls.set(motionFirstOptions);
    once.current = false;

    const action = (ev) => {
      if (ev[0].isIntersecting && firstTime.current && !once.current) {
        controls.start(motionSecondOptions);
        once.current = true;
      }
    };

    const observer = new IntersectionObserver(action, containerViewportOptions);
    if (listRef.current) observer.observe(listRef.current);

    return () => {
      if (listRef.current) observer.unobserve(listRef.current);
    };
  }, [id, firstTime, once, listRef]);

  return (
    <div className={Styles.root}>
      <SummaryLineTitle offset>You are...</SummaryLineTitle>
      <section className={Styles.pointsImages}>
        <ul ref={listRef}>
          {skillsPoints?.map((point, index) => {
            return (
              <motion.li key={point.skillPointTitle} custom={index} animate={controls} className={Styles.bgCard}>
                <section className={classNames(Styles.imageSection, Styles[`position__${index}`])} />
                <section className={Styles.cardContent}>
                  <Heading level={6} className={Styles.skillTitle}>
                    {point.skillPointTitle}
                  </Heading>
                  <div className={Styles.cardDescription}>{point.cardDescription.cardDescription}</div>
                </section>
              </motion.li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

SummaryPoints.propTypes = {
  id: PropTypes.string.isRequired,
  skillsPoints: PropTypes.arrayOf(PropTypes.shape({})),
};

SummaryPoints.defaultProps = {
  skillsPoints: null,
};

export default SummaryPoints;
