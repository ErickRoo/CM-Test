import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './form-success.module.scss';

function FormSuccess({ message, className }) {
  return <div className={classNames(Styles.successMessage, className)}>{message}</div>;
}

FormSuccess.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

FormSuccess.defaultProps = {
  message: null,
  className: null,
};

export default FormSuccess;
