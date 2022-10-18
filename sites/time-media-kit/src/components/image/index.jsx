import React from 'react';
import { getImage } from 'gatsby-plugin-image';

function Image({ image, url, lazy = true }) {
  const {
    title,
    description,
    images: { fallback },
  } = getImage(image);

  const imgEl = url ? (
    <a href={url}>
      <img loading={lazy ? 'lazy' : null} src={fallback.src} alt={title || description} />
    </a>
  ) : (
    <img loading={lazy ? 'lazy' : null} src={fallback.src} alt={title || description} />
  );

  return <picture>{imgEl}</picture>;
}

export default Image;
