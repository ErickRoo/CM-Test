import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

function CanonicalUrl({ url }) {
  if (url) {
    return (
      <Helmet>
        <link rel="canonical" href={url} />
      </Helmet>
    );
  }

  return null;
}

CanonicalUrl.propTypes = {
  url: PropTypes.string,
};

CanonicalUrl.defaultProps = {
  url: null,
};

export default CanonicalUrl;
