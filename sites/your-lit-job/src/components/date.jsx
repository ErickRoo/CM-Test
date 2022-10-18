import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import classNames from 'classnames';

function Date({ date, format, className }) {
  const parsedDate = DateTime.fromISO(date);
  const formats = {
    medium: {
      format: DateTime.DATE_MED,
      method: 'toLocalString',
    },
    writtenDateTime: {
      format: "DDD 'at' h:mma ZZZZ",
      method: 'toFormat',
    },
  };

  const formattedDate = (requestedFormat) => {
    if (requestedFormat && formats[requestedFormat]) {
      if (formats[requestedFormat].method === 'toLocalString') {
        return parsedDate.toLocaleString(formats[requestedFormat].format);
      }
      if (formats[requestedFormat].method === 'toFormat') {
        return parsedDate.toFormat(formats[requestedFormat].format);
      }
    }

    return null;
  };

  return (
    <time dateTime={parsedDate.toISO()} className={classNames(className)}>
      {formattedDate(format)}
    </time>
  );
}

Date.propTypes = {
  date: PropTypes.string.isRequired,
  format: PropTypes.string,
  className: PropTypes.string,
};

Date.defaultProps = {
  format: 'medium',
  className: null,
};

export default Date;
