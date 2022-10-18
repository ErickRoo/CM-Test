import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { motion, useAnimation } from 'framer-motion';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as Styles from './tool-tip-badge.module.scss';

import Heading from '../../heading';

const motionOptions = {
  initial: {
    opacity: 0,
  },
  animateD: {
    top: [-10, 10, 10, 30],
    opacity: [0, 1, 1, 0],
  },
  animateM: {
    top: [50, 70, 70, 90],
    opacity: [0, 1, 1, 0],
  },
  animateQ: {
    bottom: [95, 75, 75, 55],
    opacity: [0, 1, 1, 0],
  },
  transition: {
    delay: 0.1,
    duration: 3,
    times: [0, 0.2, 0.8, 1],
  },
};

function ToolTipBadge({ icon, level, title, description, link, onAnimationEnd }) {
  const controls = useAnimation();
  const { fpoImage, medals } = useStaticQuery(
    graphql`
      query QUERY_TOOL_TIP_BADGE {
        fpoImage: file(relativePath: { regex: "/components/profile-badges/fpo/" }) {
          ...LocalFileFragment
        }
        medals: allFile(
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

  let medalType;
  switch (level) {
    case 'bronze':
      medalType = 0;
      break;
    case 'silver':
      medalType = 1;
      break;
    case 'gold':
      medalType = 2;
      break;
    default:
      break;
  }

  const iconAlt = icon?.alt || fpoImage.alt;
  const iconImage = getImage(icon?.gImage?.gatsbyImageData || fpoImage.gImage.gatsbyImageData);
  const medalAlt = !Number.isNaN(medalType) && medals.nodes[medalType]?.alt;
  const medalImage = !Number.isNaN(medalType) && getImage(medals.nodes[medalType]?.gImage?.gatsbyImageData);

  const animationFn = async () => {
    let version = 'D';
    if (window.innerWidth <= 768) {
      version = level === 'quick-tip' ? 'Q' : 'M';
    }
    await controls.start(`animate${version}`);
    onAnimationEnd();
  };

  useEffect(() => {
    animationFn();
  }, []);

  return (
    <div className={Styles.root}>
      <Link to={link}>
        <motion.section
          className={classNames(Styles.container, level === 'quick-tip' && Styles.quickTip)}
          initial="initial"
          animate={controls}
          variants={motionOptions}
          transition={motionOptions.transition}
        >
          <GatsbyImage alt={iconAlt} image={iconImage} />
          {medalAlt && (
            <div className={Styles.medal}>
              <GatsbyImage alt={medalAlt} image={medalImage} />
            </div>
          )}
          <Heading level={2} className={Styles.title}>
            {title}
          </Heading>
          <p className={Styles.description}>{description}</p>
        </motion.section>
      </Link>
    </div>
  );
}

ToolTipBadge.propTypes = {
  icon: PropTypes.shape({
    alt: PropTypes.string,
    gImage: PropTypes.shape({
      gatsbyImageData: PropTypes.shape({}),
    }),
  }),
  level: PropTypes.string,
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
  description: PropTypes.string.isRequired,
  onAnimationEnd: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),
};

ToolTipBadge.defaultProps = {
  icon: {},
  level: '',
  link: '',
  onAnimationEnd: null,
};

export default ToolTipBadge;
