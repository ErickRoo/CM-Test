import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'gatsby';
import * as Styles from './return-button.module.scss';

function ReturnButton({ className, to, text }) {
  return (
    <Link className={classNames(Styles.root, className)} to={to}>
      <svg viewBox="0 0 17 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M 1 8 L 8 15 L 15 8 L 13.2 6.2 L 9.5 10 L 9.5 0.5 L 6.5 0.5 L 6.5 10 L 2.8 6.2 Z" />
      </svg>
      {text}
    </Link>
  );
}

ReturnButton.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ReturnButton.defaultProps = {
  className: null,
};

export default ReturnButton;
