import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { motion, useAnimation } from 'framer-motion';
import * as Styles from './summary-animation-shield.module.scss';

import { getBottomSvgPaths } from '../../../utils/skills-summary';

const topSvgPaths = [
  'M213.823 61H37.222C19.4792 61 5.04492 75.4788 5.04492 93.2763V205.919C5.04492 219.372 12.2609 231.908 23.8757 238.635L106.692 286.596C112.41 289.907 118.921 291.658 125.522 291.658C132.125 291.658 138.636 289.907 144.353 286.596L227.169 238.635C238.785 231.908 246 219.372 246 205.919V93.2763C246 75.4788 231.566 61 213.823 61V61Z',
  'M25 77.8856V126.004L116.066 178.782C121.595 181.987 128.406 181.987 133.935 178.782L225.001 126.004V126.004V77.8856H25Z',
  'M113.626 184.356L21.8975 131.194V217.351L121.897 275.308V246.33V198.737C121.897 192.804 118.745 187.322 113.626 184.356',
  'M128.103 246.33V275.308L228.104 217.351V131.193L136.374 184.355C131.256 187.322 128.103 192.805 128.103 198.737V246.33Z',
];

const motionShieldOptions = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      ease: 'easeIn',
      delay: 0.5,
    },
  },
};

const motionPathOptions = {
  initial: {
    opacity: 0,
    pathLength: 0,
  },
  animate: (custom) => ({
    opacity: 1,
    pathLength: 2,
    transition: {
      delay: 1.1 + custom * 0.3,
      duration: 1,
      ease: 'easeInOut',
    },
  }),
  secondTransition: {
    ease: 'easeIn',
    duration: 0.3,
  },
};

function SummaryAnimationShield({ shieldImage, skillsSorted, buttonsRef, action }) {
  const pathControls = useAnimation();
  const [bottomSvgPaths, setBottomSvgPaths] = useState([]);
  const gatsbyShieldImg = getImage(shieldImage?.gImage?.gatsbyImageData);

  useEffect(() => {
    const svgPaths = getBottomSvgPaths(buttonsRef);
    setBottomSvgPaths(svgPaths);
    pathControls.start('animate');
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const svgPaths = getBottomSvgPaths(buttonsRef);
      setBottomSvgPaths(svgPaths);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [bottomSvgPaths, buttonsRef]);

  const handlePathHover = (index) => {
    pathControls.start((custom) => {
      let opacity = 1;
      if (index > 0) {
        opacity = custom === index ? 1 : 0.8;
      }
      return {
        opacity,
        transition: motionPathOptions.secondTransition,
      };
    });
  };

  return (
    <motion.section variants={motionShieldOptions} className={Styles.root}>
      <motion.svg viewBox="0 0 250 300" xmlns="http://www.w3.org/2000/svg">
        {topSvgPaths.map((pathD, index) => {
          const skill = skillsSorted[index - 1];

          return <motion.path
            key={`top-svg-shield-${index > 0 ? skill.id : 'background'}`}
            className={Styles[`fill__${index > 0 ? skill.id : 'background'}`]}
            style={index > 0 ? {fill: skill.foregroundColor} : {}}
            custom={index}
            initial="initial"
            animate={pathControls}
            variants={motionPathOptions}
            onMouseEnter={() => handlePathHover(index)}
            onClick={() => action(index - 1)}
            d={pathD}
          />
        })}
      </motion.svg>
      <GatsbyImage image={gatsbyShieldImg} alt={shieldImage?.alt} />
      <motion.svg fill="none" xmlns="http://www.w3.org/2000/svg">
        {bottomSvgPaths?.map((pathD, index) => (
          <motion.path
            key={`bottom-svg-shield-${skillsSorted[index].id}`}
            variants={motionPathOptions}
            custom={index}
            d={pathD}
            stroke="#000"
          />
        ))}
      </motion.svg>
    </motion.section>
  );
}

SummaryAnimationShield.propTypes = {
  shieldImage: PropTypes.shape({
    id: PropTypes.string,
    alt: PropTypes.string,
    path: PropTypes.string,
    src: PropTypes.string,
    gImage: PropTypes.shape({
      gatsbyImageData: PropTypes.shape({}),
    }),
  }).isRequired,
  skillsSorted: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
  buttonsRef: PropTypes.oneOfType([PropTypes.func, PropTypes.any]).isRequired,
  action: PropTypes.func,
};

SummaryAnimationShield.defaultProps = {
  action: () => {},
};

export default SummaryAnimationShield;
