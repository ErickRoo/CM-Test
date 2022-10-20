import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './content-type-icon.module.scss';

function ContentTypeIcon({ type, size, className, corner }) {
  let contentType;
  let contentTypeTitle;

  switch (type) {
    case 'ContentfulArticle':
      contentType = 'article';
      contentTypeTitle = 'Article';
      break;
    case 'ContentfulMultimedia':
      contentType = 'multimedia';
      contentTypeTitle = 'Video';
      break;
    case 'ContentfulMeetup':
      contentType = 'meetup';
      contentTypeTitle = 'Meetup';
      break;
    case 'ContentfulAsk':
      contentType = 'ask';
      contentTypeTitle = 'Ask Me Anything';
      break;
    default:
      contentType = false;
      break;
  }

  if (contentType) {
    return (
      <div
        className={classNames(
          Styles.root,
          Styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
          Styles[`type${type.charAt(0).toUpperCase() + type.slice(1)}`],
          className,
          corner && Styles.corner
        )}
      >
        <div className={Styles.icon} />
        {size !== 'small' && <div className={Styles.title}>{contentTypeTitle}</div>}
      </div>
    );
  }

  return null;
}

ContentTypeIcon.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
  className: PropTypes.string,
  corner: PropTypes.bool,
};

ContentTypeIcon.defaultProps = {
  size: 'medium',
  className: '',
  corner: false,
};

export default ContentTypeIcon;
