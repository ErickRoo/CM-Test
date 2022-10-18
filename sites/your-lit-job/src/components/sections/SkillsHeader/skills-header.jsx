import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as Styles from './skills-header.module.scss';

import Heading from '../../heading';

function SkillsHeader({ headerImg }) {
  const headerGatsbyImg = getImage(headerImg?.gImage?.gatsbyImageData);

  return (
    <section className={Styles.root}>
      <div className={Styles.background}>
        <GatsbyImage alt={headerImg?.alt} image={headerGatsbyImg} />
      </div>
      <div className={Styles.center}>
        <Heading level={1}>Skills Explorer: Quiz</Heading>
      </div>
    </section>
  );
}

SkillsHeader.propTypes = {
  headerImg: PropTypes.shape({
    alt: PropTypes.string,
    gImage: PropTypes.shape({
      gatsbyImageData: PropTypes.shape({}),
    }),
  }),
};

SkillsHeader.defaultProps = {
  headerImg: null,
};

export default SkillsHeader;
