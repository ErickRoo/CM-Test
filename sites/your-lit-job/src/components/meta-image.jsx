import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';
import shareImage from '../assets/global/share.jpg';
import { makeAbsoluteUrl } from '../utils/url';

function MetaImage({ image }) {
  let path;

  const siteMetadata = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);
  const { siteUrl } = siteMetadata.site.siteMetadata;

  if (typeof image === 'object') {
    const imageObj = getImage(image);
    if (imageObj.images && imageObj.images.fallback && imageObj.images.fallback.src) {
      path = imageObj.images.fallback.src;
    } else {
      return null;
    }
  } else if (typeof image === 'string') {
    path = image;
  } else {
    return null;
  }

  return (
    <Helmet>
      <meta property="og:image" content={makeAbsoluteUrl(path, siteUrl)} />
      <meta name="twitter:image" content={makeAbsoluteUrl(path, siteUrl)} />
    </Helmet>
  );
}

MetaImage.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      images: PropTypes.shape({
        fallback: PropTypes.shape({
          src: PropTypes.string,
        }),
      }),
    }),
  ]),
};

MetaImage.defaultProps = {
  image: shareImage,
};

export default MetaImage;
