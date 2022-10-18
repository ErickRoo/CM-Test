import React from 'react';
import { getImage } from 'gatsby-plugin-image';

function Image({ image }) {
  const {
    title,
    description,
    images: { fallback, sources },
  } = getImage(image);
  const element = (
    <picture>
      {sources.map(({ srcSet, type }) => (
        <source srcSet={srcSet} type={type} />
      ))}
      <img loading="lazy" src={fallback.src} title={title} alt={description} />
    </picture>
  );

  return element;
}

export default Image;
