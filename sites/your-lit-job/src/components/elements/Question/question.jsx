import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, useAnimation } from 'framer-motion';
import * as Styles from './question.module.scss';

import Heading from '../../heading';
import SliderIcons from '../SliderIcons';

const motionFirstOptions = (show = false) => ({
  opacity: show ? 1 : 0,
  scale: 0.9,
  translateY: `10%`,
  pointerEvents: 'none',
});

const motionSecondOptions = {
  scale: [0.9, 0.9, 1],
  translateY: ['10%', '0%', '0%'],
  transition: {
    ease: [0.25, 0.1, 0.27, 0.93],
    duration: 0.5,
    times: [0, 0.3, 1],
  },
  pointerEvents: 'all',
};

const motionViewportOptions = (margin) => ({
  margin,
  amount: 0.8,
});

function Question({ qid, text, show, onSelect, typeColor, marginViewPort, onShow }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.set(motionFirstOptions(false));
  }, []);

  useEffect(() => {
    controls.start(motionFirstOptions(show));
  }, [show]);

  const handleViewportEnter = () => {
    if (show) {
      controls.start(motionSecondOptions);
      onShow({ qid, showing: true });
    }
  };

  const handleViewportLeave = () => {
    controls.start(motionFirstOptions(show));
    onShow({ qid, showing: false });
  };

  return (
    <section id={qid} className={Styles.root}>
      <motion.div
        onViewportEnter={handleViewportEnter}
        onViewportLeave={handleViewportLeave}
        viewport={motionViewportOptions(marginViewPort)}
      >
        <motion.div className={Styles.container} animate={controls}>
          <Heading level={2} className={Styles[`header__type${typeColor}`]}>
            {text}
          </Heading>
          <SliderIcons qid={qid} onSelect={onSelect} />
          <div className={Styles.bottomText}>
            <section>
              <p>{`Definitely\nnot me`}</p>
              <p>{`Totally\nme`}</p>
            </section>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

Question.propTypes = {
  qid: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  typeColor: PropTypes.string,
  marginViewPort: PropTypes.string,
  onShow: PropTypes.func.isRequired,
};

Question.defaultProps = {
  typeColor: '',
  marginViewPort: '',
};

export default Question;
