import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './content-actions.module.scss';
import FavoriteButton from './favorite-button';
import PrintButton from './print-button';

function ContentActions({ favorite, print, className }) {
  if (favorite || print) {
    return (
      <div className={classNames(Styles.root, className)}>
        {print && <PrintButton />}
        {favorite && <FavoriteButton postId={favorite} />}
      </div>
    );
  }
}

ContentActions.propTypes = {
  favorite: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  print: PropTypes.bool,
  className: PropTypes.string,
};

ContentActions.defaultProps = {
  favorite: false,
  print: false,
  className: '',
};

export default ContentActions;
