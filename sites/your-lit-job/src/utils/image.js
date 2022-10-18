import { getImage } from 'gatsby-plugin-image';

// eslint-disable-next-line import/prefer-default-export
export function getGatsbyImage(data) {
  let image;

  if (data && data.media && data.media.image) {
    image = getImage(data.media.image);
  }

  return image;
}
