import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './generic-page-title.module.scss';
import Heading from './heading';

function GenericPageTitle({ children, className }) {
  return (
    <Heading level={1} className={classNames(Styles.root, className)}>
      {children}
    </Heading>
  );
}

GenericPageTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

GenericPageTitle.defaultProps = {
  className: null,
};

export default GenericPageTitle;
