import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './generic-page-alt-cta.module.scss';

function GenericPageAltCta({ children, className }) {
  if (!children) {
    return null;
  }

  return <div className={classNames(Styles.root, className)}>{children}</div>;
}

GenericPageAltCta.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

GenericPageAltCta.defaultProps = {
  className: null,
};

export default GenericPageAltCta;
