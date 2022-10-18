import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './form-processing.module.scss';

function FormProcessing({ isProcessing, children }) {
  return (
    <div className={classNames(Styles.root)} data-show={isProcessing ? 1 : 0}>
      <span className={classNames(Styles.children)}>{children}</span>
      <div className={classNames(Styles.loading)}>loading</div>
    </div>
  );
}

FormProcessing.propTypes = {
  isProcessing: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FormProcessing;
