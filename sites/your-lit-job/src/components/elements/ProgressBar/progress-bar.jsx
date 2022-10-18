import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { trackEvent } from '../../../utils/track';
import * as Styles from './progress-bar.module.scss';

const motionBarFirstOptions = {
  width: '10px',
};

const motionBarSecondOptions = (counter, total) => {
  let progress = '10px';
  if (counter > 0) progress = `${(counter / total) * 100}%`;
  return {
    width: progress,
    transition: {
      duration: 1,
    },
  };
};

function ProgressBar({ counter, total }) {
  const previousCounter = useRef(0);

  useEffect(() => {
    if (previousCounter.current !== counter) {
      trackEvent('Skills Explorer progress', 'Skills Explorer', counter, null);
      previousCounter.current = counter;
    }
  }, [counter, previousCounter]);

  return (
    <div className={Styles.root}>
      <div>
        <p>
          <span>{counter}</span> / {total} Answered
        </p>
        <div className={Styles.bar}>
          <motion.hr initial={motionBarFirstOptions} animate={motionBarSecondOptions(counter, total)} />
        </div>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  counter: PropTypes.number,
  total: PropTypes.number,
};

ProgressBar.defaultProps = {
  counter: 0,
  total: 1,
};

export default ProgressBar;
