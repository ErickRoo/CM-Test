import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

function MetaTitle({ title, prefix, suffix }) {
  let compiledTitle = title;

  if (prefix) {
    compiledTitle = prefix + compiledTitle;
  }

  if (suffix) {
    compiledTitle += suffix;
  }

  return title ? (
    <Helmet>
      <title>{compiledTitle}</title>
      <meta property="og:title" content={compiledTitle} />
      <meta property="twitter:title" content={compiledTitle} />
    </Helmet>
  ) : null;
}

MetaTitle.propTypes = {
  title: PropTypes.string,
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

MetaTitle.defaultProps = {
  title: false,
  prefix: false,
  suffix: ' | Your 🔥 Job',
};

export default MetaTitle;
