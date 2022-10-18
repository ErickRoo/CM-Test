import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './form-error.module.scss';

function FormError({ message }) {
  let translatedMessage = message;
  if (message === 'Firebase: Error (auth/user-not-found).') {
    translatedMessage = "Can't find that username, please try again!";
  } else if (message === 'Firebase: Error (auth/email-already-exists).') {
    translatedMessage = 'That username is already taken, please try again!';
  } else if (message === 'Firebase: Error (auth/email-already-in-use).') {
    translatedMessage = 'That username is already taken, please try again!';
  } else if (message === 'Firebase: Error (auth/invalid-email).') {
    translatedMessage = 'That username is not working, please try again!';
  } else if (message === 'Firebase: Error (auth/wrong-password).') {
    translatedMessage = 'That password is incorrect, please try again!';
  } else if (message.includes('Firebase: ') || message.trim() === 'internal') {
    translatedMessage = 'Something went wrong! Please try again!';
  }

  return <div className={classNames(Styles.errorMessage)}>{translatedMessage}</div>;
}

FormError.propTypes = {
  message: PropTypes.string,
};

FormError.defaultProps = {
  message: null,
};

export default FormError;
