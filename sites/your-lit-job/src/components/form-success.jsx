import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './form-success.module.scss';

function FormSuccess({ message }) {
  return <div className={classNames(Styles.successMessage)}>{message}</div>;
}

FormSuccess.propTypes = {
  message: PropTypes.string,
};

FormSuccess.defaultProps = {
  message: null,
};

export default FormSuccess;
