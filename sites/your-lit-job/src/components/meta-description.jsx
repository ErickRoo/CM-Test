import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

function MetaDescription({ description }) {
  return description ? (
    <Helmet>
      <meta name="description" content={description} />
      <meta name="og:description" content={description} />
      <meta name="pinterest:description" content={description} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  ) : null;
}

MetaDescription.propTypes = {
  description: PropTypes.string,
};

MetaDescription.defaultProps = {
  description: false,
};

export default MetaDescription;
