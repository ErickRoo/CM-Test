import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';
import classNames from 'classnames';
import * as Styles from './image-block.module.scss';
import { getGatsbyImage } from '../utils/image';

function ImageBlock({ image, alt, description, className, source, imageClassName, fill }) {
  const copy = () => {
    if (description || source) {
      return (
        <div className={Styles.copy}>
          {description && <div className={Styles.description}>{description}</div>}
          {source && <div className={Styles.source}>{source}</div>}
        </div>
      );
    }

    return null;
  };

  const imagePath = getGatsbyImage(image);

  if (imagePath) {
    return (
      <div className={classNames(Styles.root, className, { [Styles.fill]: fill })}>
        <GatsbyImage image={imagePath} alt={alt} className={classNames(Styles.image, imageClassName)} />
        {copy()}
      </div>
    );
  }

  return null;
}

ImageBlock.propTypes = {
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  image: PropTypes.shape({}).isRequired,
  alt: PropTypes.string,
  description: PropTypes.string,
  source: PropTypes.string,
  fill: PropTypes.bool,
};

ImageBlock.defaultProps = {
  className: null,
  imageClassName: null,
  alt: ' ',
  description: null,
  source: null,
  fill: false,
};

export default ImageBlock;
