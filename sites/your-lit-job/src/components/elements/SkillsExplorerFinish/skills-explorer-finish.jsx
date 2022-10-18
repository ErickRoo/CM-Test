import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import { motion, useAnimation } from 'framer-motion';
import * as Styles from './skills-explorer-finish.module.scss';

import Heading from '../../heading';
import Button from '../../button';

const motionContainerFirstOptions = {
  opacity: 0,
  scale: 0.9,
  pointerEvents: 'none',
};

const motionContainerSecondOptions = {
  opacity: 1,
  scale: 1,
  pointerEvents: 'all',
  transition: {
    duration: 1,
  },
};

const motionContainerViewportOptions = () => {
  const margins = { top: '', bottom: '' };

  if (window.innerHeight > 1024) {
    margins.top = '-30%';
    margins.bottom = '-10%';
  } else if (window.innerHeight > 768) {
    margins.top = '-260px';
    margins.bottom = '-10%';
  } else {
    margins.top = '-50px';
    margins.bottom = '-50px';
  }

  return {
    margin: `${margins.top} 0% ${margins.bottom} 0%`,
    amount: 0.8,
    once: true,
  };
};

const motionAnimationFirstConfig = {
  opacity: 0,
};

const motionAnimationSecondConfig = (custom) => ({
  opacity: [0, 1],
  scale: [0, 1],
  transition: {
    delay: 0.2 + custom * 0.05,
    ease: 'easeInOut',
    duration: 1,
    times: [0, 1],
  },
});

function SkillsExplorerFinish({ action, showCard }) {
  const [vpEnter, setVpEnter] = useState(false);
  const firstControls = useAnimation();
  const secondControls = useAnimation();

  const { allFile } = useStaticQuery(
    graphql`
      query QUERY_FINAL_TEXT {
        allFile(
          filter: {
            relativePath: { regex: "/components/skills-explorer-finish/emoji/" }
            ext: { in: [".png", ".jpg"] }
          }
          sort: { order: ASC, fields: name }
        ) {
          nodes {
            ...LocalFileFragment
          }
        }
      }
    `
  );
  const allImages = { left: [], right: [] };
  allFile?.nodes.forEach((oneImage) => {
    const key = oneImage.alt.indexOf('emoji-l') >= 0 ? 'left' : 'right';
    allImages[key].push(oneImage);
  });

  const animationStart = async () => {
    firstControls.start(motionContainerSecondOptions);
    await secondControls.start(motionAnimationSecondConfig);
  };

  useEffect(() => {
    if (showCard && vpEnter) animationStart();
  }, [showCard, vpEnter]);

  return (
    <section id="question-final" className={Styles.root}>
      <div className={Styles.bottomText}>
        <motion.div
          onViewportEnter={() => setVpEnter(true)}
          onViewportLeave={() => setVpEnter(false)}
          viewport={motionContainerViewportOptions()}
        >
          <motion.div initial={motionContainerFirstOptions} animate={firstControls}>
            <Heading level={2}>Done!</Heading>
            <Button type="button" theme="green" action={action} width="md">
              See my results
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <div className={Styles.animation}>
        {Object.entries(allImages).map(([name, images]) => (
          <section key={`card-images-${name}`} className={Styles[`icons__${name}`]}>
            {images.map((oneImage, index) => {
              const key = `${oneImage.id}-${index}`;
              return (
                <motion.img
                  key={key}
                  initial={motionAnimationFirstConfig}
                  animate={secondControls}
                  custom={index}
                  alt={oneImage.alt}
                  src={oneImage.src}
                />
              );
            })}
          </section>
        ))}
      </div>
    </section>
  );
}

SkillsExplorerFinish.propTypes = {
  action: PropTypes.func,
  showCard: PropTypes.bool,
};

SkillsExplorerFinish.defaultProps = {
  action: null,
  showCard: false,
};

export default SkillsExplorerFinish;
