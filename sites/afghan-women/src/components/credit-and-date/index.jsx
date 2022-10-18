import React from 'react';
import classNames from 'classnames/bind';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function CreditAndDate() {
  return (
    <div className={cx('CreditAndDate')}>
      <div>
        This story was produced in partnership with the Pulitzer Center and in collaboration with Rukhshana Media, an
        Afghan women’s media organization.
      </div>
      <span className={cx('date')}>August 11th, 2022</span>
    </div>
  );
}

export default CreditAndDate;
