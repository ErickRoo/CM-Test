import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Heading({ heading }) {
  return (
    <div className={cx('Heading')}>
      <div className={cx('inner')}>
        <div className={cx('headingWrapper')}>
          <h1>{heading}</h1>
        </div>
      </div>
    </div>
  );
}

Heading.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default Heading;
