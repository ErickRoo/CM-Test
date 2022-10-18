import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './generic-page-copy.module.scss';

function GenericPageCopy({ children, className }) {
  if (!children) {
    return null;
  }

  return <div className={classNames(Styles.root, className, 'container', 'container-sm')}>{children}</div>;
}

GenericPageCopy.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

GenericPageCopy.defaultProps = {
  className: null,
};

export default GenericPageCopy;
