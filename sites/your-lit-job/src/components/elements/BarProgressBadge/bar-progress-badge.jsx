import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { motion, useAnimation } from 'framer-motion';
import * as Styles from './bar-progress-badge.module.scss';

const motionOptions = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  transition: {
    ease: 'easeInOut',
  },
};

const getLatestThreshold = (levels) => {
  if (typeof levels === 'undefined') {
    return 0;
  }
  const latest = levels.length - 1;
  return levels[latest]?.threshold || 0;
};

const getProgress = (_progress, _levels) => {
  if (typeof _levels === 'undefined') {
    return 0;
  }
  const activeLevels = _levels.filter(({ active }) => active);
  const max = getLatestThreshold(activeLevels);
  const progress = _progress.length > max ? max : _progress.length;
  return progress;
};

const getPercent = (counter, total, levels) => {
  if (counter <= 0) {
    return '10px';
  }
  if (levels.length <= 1 && counter > 0) {
    return `${(counter / total) * 100}%`;
  }
  if (levels.length === 3) {
    for (let i = 0; i < levels.length; i += 1) {
      const threshold = levels[i]?.threshold;
      if (threshold >= counter) {
        const prevThreshold = i > 0 ? levels[i - 1].threshold : 0;
        const dividend = counter - prevThreshold;
        const divider = threshold - prevThreshold;
        const offset = 34 * i;

        return `${(dividend / divider) * 23 + offset}%`;
      }
    }
  }
  return '10px';
};

const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

function BarProgressBadge({ bid, status, progress, levels }) {
  const controls = useAnimation();
  const { allIcons } = useStaticQuery(
    graphql`
      query QUERY_BAR_BADGE {
        allIcons: allFile(
          filter: { relativePath: { regex: "/components/bar-progress-badge/" } }
          sort: { order: ASC, fields: name }
        ) {
          nodes {
            ...LocalFileFragment
          }
        }
      }
    `
  );

  const isMultilevel = levels?.length > 1;
  const counter = getProgress(progress, levels);
  const total = getLatestThreshold(levels) || 1;
  const percent = getPercent(counter, total, levels);
  const initToggleList = Array(allIcons.nodes.length).fill(false);
  const [toggleList, setToggleList] = useState(initToggleList);

  const handlePopup = (type, useToolTip, index) => {
    if (useToolTip && !isTouchDevice()) {
      if (type === 'mouseover') {
        controls.start((custom) => custom === index && 'animate');
      } else if (type === 'mouseleave') {
        controls.start((custom) => custom === index && 'initial');
      }
    }
  };

  const handleTogglePopup = (useToolTip, index) => {
    if (useToolTip) {
      const newToggleList = [...toggleList];
      newToggleList[index] = !newToggleList[index];
      if (newToggleList[index]) {
        controls.start((custom) => custom === index && 'animate');
      } else {
        controls.start((custom) => custom === index && 'initial');
      }
      setToggleList(newToggleList);
    }
  };

  return (
    <>
      <div className={classNames(Styles.bar, progress.length > 0 ? Styles.hasProgress : Styles.noProgress)}>
        <hr style={{ width: percent }} />
        {isMultilevel && (
          <ul className={Styles.medals}>
            {allIcons?.nodes?.map((icon, index) => {
              const key = `medal-${bid}-${icon.id}-${index}`;
              const image = getImage(icon.gImage.gatsbyImageData);
              const isInactiveLevel = !levels[index]?.active || !status;
              const className = classNames(Styles.medalWrapper, isInactiveLevel && Styles.medalWrapper__inactive);
              const searchTxt = icon.alt.indexOf('-medal-');
              const alt = searchTxt >= 0 ? icon.alt.slice(searchTxt + 7) : icon.alt;
              const useToolTip = !levels[index]?.active && status;

              return (
                <li key={key} className={className}>
                  {useToolTip && (
                    <motion.section
                      className={Styles.toolTip}
                      transition={motionOptions.transition}
                      variants={motionOptions}
                      initial="initial"
                      animate={controls}
                      custom={index}
                    >
                      <svg className={Styles.shape} viewBox="0 0 231 135" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28 0C12 0 0 12 0 28V82C0 97 12 110 28 110H100L111 131C112 134 117 134 118 131L129 110H202C217 110 230 97 230 82V28C230 12.536 217 0 202 0H28" />
                      </svg>
                      <strong>Coming Soon!</strong>
                      <p>More content is on its way to finish this badge.</p>
                    </motion.section>
                  )}
                  <section className={Styles.medal}>
                    <GatsbyImage
                      alt={alt}
                      image={image}
                      onMouseOver={({ type }) => handlePopup(type, useToolTip, index)}
                      onMouseLeave={({ type }) => handlePopup(type, useToolTip, index)}
                      onTouchStart={() => handleTogglePopup(useToolTip, index)}
                    />
                  </section>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <p className={Styles.counter}>
        <span>{counter}</span> / {total}
      </p>
    </>
  );
}

BarProgressBadge.propTypes = {
  bid: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  progress: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.any])).isRequired,
  levels: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
    })
  ).isRequired,
};

BarProgressBadge.defaultProps = {};

export default BarProgressBadge;
