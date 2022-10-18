import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './summary-line-title.module.scss';

import Heading from '../../heading';

function SummaryLineTitle({ offset, children }) {
  return (
    <div className={Styles.root} data-offset={offset}>
      <div />
      <hr />
      <Heading level={3}>{children}</Heading>
    </div>
  );
}

SummaryLineTitle.propTypes = {
  offset: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

SummaryLineTitle.defaultProps = {
  offset: false,
  children: null,
};

export default SummaryLineTitle;
