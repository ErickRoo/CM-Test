import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

function MetaKeywords({ keywords }) {
  return keywords ? (
    <Helmet>
      <meta name="keywords" content={keywords} />
    </Helmet>
  ) : null;
}

MetaKeywords.propTypes = {
  keywords: PropTypes.string,
};

MetaKeywords.defaultProps = {
  keywords: false,
};

export default MetaKeywords;
