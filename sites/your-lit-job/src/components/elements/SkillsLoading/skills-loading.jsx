import React from 'react';
import { motion } from 'framer-motion';
import * as Styles from './skills-loading.module.scss';

function SkillsLoading() {
  return (
    <div className={Styles.root}>
      <div>
        <motion.svg
          initial={{ rotate: 0 }}
          animate={{ rotate: 361 }}
          transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <circle r="45" cy="75" cx="75" fill="none" />
          </g>
        </motion.svg>
        <h1>Loading...</h1>
      </div>
    </div>
  );
}

SkillsLoading.propTypes = {};

SkillsLoading.defaultProps = {};

export default SkillsLoading;
