import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import * as Styles from './rich-text-media.module.scss';
import ImageBlock from './image-block';

function RichTextMedia({ image, description, alt, source, className }) {
  return (
    <ImageBlock
      className={classNames(Styles.root, className)}
      image={image}
      source={source}
      description={description}
      alt={alt}
      imageClassName={classNames('image-shadow', 'image-shadow-aqua')}
    />
  );
}

RichTextMedia.propTypes = {
  image: PropTypes.shape({}).isRequired,
  alt: PropTypes.string,
  description: PropTypes.string,
  source: PropTypes.string,
  className: PropTypes.string,
};

RichTextMedia.defaultProps = {
  alt: ' ',
  description: null,
  source: null,
  className: null,
};

export const query = graphql`
  fragment RichTextMediaFields on ContentfulMedia {
    contentful_id
    alt
    description
    source
    media {
      image: gatsbyImageData(layout: CONSTRAINED)
    }
  }
`;

export default RichTextMedia;
