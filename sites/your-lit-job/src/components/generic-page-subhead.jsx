import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './generic-page-subhead.module.scss';
import Heading from './heading';

function GenericPageSubhead({ children, className }) {
  if (!children) {
    return null;
  }

  return (
    <Heading level={2} className={classNames(Styles.root, className)}>
      {children}
    </Heading>
  );
}

GenericPageSubhead.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

GenericPageSubhead.defaultProps = {
  className: null,
};

export default GenericPageSubhead;
