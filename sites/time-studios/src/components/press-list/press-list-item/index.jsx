import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'gatsby';
import IconOpenNew from '../../icons/open-new';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

// assumes YYYY-MM-DD format, transforming to DDMonthYYYY
const formatDateDDMonthYYYY = (date) => {
  const parts = date.split('-');
  const year = parts[0];
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return `${months[month-1]} ${day}, ${year}`;
}

function PressListItem({ date, publication, headline, link, projectPage }) {
  return (
    <li className={cx('PressListItem')}>
      <span className={cx('date')}>{formatDateDDMonthYYYY(date)}</span>
      <span className={cx('publication')}>{`${publication} `}</span>
      <a href={link} target="_blank" rel="noreferrer">
        <h3 className={cx('headline')}>
          {headline}{' '}
          <span className={cx('openNew')}>
            <IconOpenNew />
          </span>
        </h3>
      </a>
      {projectPage ? (
        <span className={cx('projectLinkMobile')}>
          <span>
            <Link to={`/${projectPage.slug}`}>{projectPage.content.project.titleShort}</Link>
          </span>
        </span>
      ) : null}
    </li>
  );
}

PressListItem.propTypes = {
  date: PropTypes.string.isRequired,
  publication: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default PressListItem;
