import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Markdown from '../../markdown';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function SectionSectionHeadingDek({ heading, dek }) {
  return (
    <div className={cx('SectionSectionHeadingDek')}>
      <div className={cx('inner')}>
        <div className={cx('headingWrapper')}>
          <h2>{heading}</h2>
        </div>
        <div className={cx('dekWrapper')}>
          <Markdown>{dek}</Markdown>
        </div>
      </div>
    </div>
  );
}

SectionSectionHeadingDek.propTypes = {
  heading: PropTypes.string.isRequired,
  dek: PropTypes.string.isRequired,
};

export default SectionSectionHeadingDek;
