import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { motion, useAnimation } from 'framer-motion';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as Styles from './card-job.module.scss';

import { lerp, getDecimal, getAngle, getBgLinear } from '../utils/carousel-utils';
import CardJobHighLights from './card-job-highlights';
import { trackEvent } from '../utils/track';

const motionCardJobOptions = {
  initial: ({ foregroundColor, reverse }) => ({
    borderColor: foregroundColor,
    boxShadow: '#1f1f1f 0 10px 20px',
    rotateX: 0,
    rotateY: reverse ? 180 : 0,
  }),
};

function CardJob({ job, foregroundColor, showHeatHighlight, active }) {
  const primaryImage = job.primaryImage.gatsbyImageData && getImage(job.primaryImage.gatsbyImageData);

  const [activated, setActivated] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [reversed, setReversed] = useState(false);
  const cardControls = useAnimation();
  const btnControls = useAnimation();
  const maskControls = useAnimation();

  const initialize = () => {
    setActivated(active);
    cardControls.start('initial');
    maskControls.start(getBgLinear());
    if (active) cardControls.start({ boxShadow: `${foregroundColor} 0 10px 20px` });
  };

  useEffect(() => {
    initialize();
  }, [active]);

  const flipCard = () => {
    setReverse(!reverse);
    cardControls.start({ rotateY: !reverse ? 180 : 0 });
    btnControls.start({ z: !reverse ? -2 : 5 });
    setTimeout(() => setReversed(!reverse), 300);
  }

  useEffect(() => {
    if (!active && reverse) {
      flipCard();
    }
  }, [active, reverse]);

  const handlerHoverMouse = (ev) => {
    const { clientX, clientY, target } = ev ?? {};
    if (!target?.tagName || target.tagName !== 'SECTION' || !activated) return;

    const { left, top, width, height } = target.getBoundingClientRect() ?? {};
    const posX = getDecimal((clientX - left) / width);
    const posY = getDecimal((clientY - top) / height);
    const moveX = lerp(-10, 10, posX);
    const moveY = lerp(-15, 15, posY);
    const rotateX = moveY;
    const rotateY = (reverse ? 180 : 0) + moveX;
    const degrees = getAngle(posX, posY, { x1: 0.5, y1: 0.5 });
    const shine = Math.sqrt((posX - 0.5) ** 2 + (posY - 0.5) ** 2);

    cardControls.start({ rotateX, rotateY });
    maskControls.set(getBgLinear(degrees, shine));
  };

  const handleReverse = async () => {
    if (!activated) return;

    if (!reverse && job.title) {
      trackEvent('Flipped', 'Jobs at a glance', job.title);
    }

    flipCard();
  };

  return (
    <div className={Styles.root}>
      <motion.section
        className={Styles.card}
        custom={{ foregroundColor, reverse }}
        initial="initial"
        animate={cardControls}
        variants={motionCardJobOptions}
        onMouseMove={handlerHoverMouse}
        onMouseLeave={initialize}
      >
        <div className={classNames(Styles.frontSide, reversed && Styles.reversed)}>
          <motion.div className={Styles.frontMask} animate={maskControls} />
          {primaryImage && (
            <GatsbyImage className={Styles.frontImage} image={primaryImage} alt={job?.primaryImage?.alt} />
          )}
          <p>{job?.title}</p>
        </div>
        <div className={classNames(Styles.backSide, !reversed && Styles.reversed)}>
          <p className={Styles.backTitle}>{job?.title}</p>
          <p className={Styles.backSubtitle}>{job?.industryIs?.title}</p>
          <p className={Styles.backDescription}>{job?.description?.description}</p>
          <CardJobHighLights job={job} showHeatHighlight={showHeatHighlight} />
        </div>
        <motion.div className={Styles.buttonWrapper} animate={btnControls} initial={{ z: 5 }}>
          <button
            type="button"
            aria-label="turn card"
            onClick={handleReverse}
            className={classNames(activated && Styles.buttonEnable)}
          />
        </motion.div>
      </motion.section>
    </div>
  );
}

CardJob.propTypes = {
  foregroundColor: PropTypes.string,
  active: PropTypes.bool,
  showHeatHighlight: PropTypes.bool,
  job: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.shape({
      description: PropTypes.string,
    }),
    annualPay: PropTypes.number,
    levelEducation: PropTypes.string,
    jobOutlook: PropTypes.string,
    thisJobIs: PropTypes.number,
    industryIs: PropTypes.shape({
      title: PropTypes.string,
    }),
    primaryImage: PropTypes.shape({
      alt: PropTypes.string,
      gatsbyImageData: PropTypes.shape({}),
    }),
  }),
};

CardJob.defaultProps = {
  foregroundColor: '#ffffff',
  active: false,
  showHeatHighlight: false,
  job: {},
};

export const query = graphql`
  fragment JobFields on ContentfulJob {
    contentful_id
    id
    title
    description {
      description
    }
    annualPay
    jobOutlook
    levelEducation
    thisJobIs
    industryIs {
      title
    }
    primaryImage {
      alt: title
      gatsbyImageData(width: 840, placeholder: BLURRED)
    }
  }
`;

export default CardJob;
