import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function SectionProjectCredits({ credits }) {
  const creditsList = credits;

  return (
    <div className={cx('SectionProjectCredits')}>
      <div className={cx('inner')}>
        <div className={cx('headlineWrapper')}>
          <h2>Credits</h2>
        </div>

        <div className={cx('creditsWrapper')}>
          {creditsList.map((credit) => {
            return (
              <span key={credit.person.fullName} className={cx('credit')}>
                <span className={cx('name')}>{credit.person.fullName}</span>
                <span className={cx('role')}>{credit.role}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

SectionProjectCredits.propTypes = {
  credits: PropTypes.arrayOf(
    PropTypes.shape({
      person: PropTypes.shape({
        fullName: PropTypes.string.isRequired,
      }).isRequired,
      role: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default SectionProjectCredits;
