import React from 'react';
import classNames from 'classnames';
import { useAuth } from '../contexts/AuthContext';
import { useSite } from '../contexts/SiteContext';
import * as Styles from './favorite-bar.module.scss';

function FavoriteBar() {
  const { isSignedIn } = useAuth();
  const { favoriteFilter, setFavoriteFilter } = useSite();

  const handleChange = ({ target }) => {
    setFavoriteFilter(target.id === 'favorites');
  };

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className={Styles.root}>
      <form className={Styles.container} onChange={handleChange}>
        <div className={classNames('form-check', Styles.formCheck)}>
          <label htmlFor="view-all">
            <input
              id="view-all"
              type="radio"
              checked={!favoriteFilter}
              className={classNames('form-check-input', Styles.radio, !favoriteFilter && Styles.radioSelected)}
              onChange={() => {}}
            />
            View all
          </label>
        </div>
        <div className={classNames('form-check', Styles.formCheck)}>
          <label htmlFor="favorites">
            <input
              id="favorites"
              type="radio"
              checked={favoriteFilter}
              className={classNames('form-check-input', Styles.radio, favoriteFilter && Styles.radioSelected)}
              onChange={() => {}}
            />
            Favorites
          </label>
        </div>
      </form>
    </div>
  );
}

FavoriteBar.propTypes = {};

FavoriteBar.defaultProps = {};

export default FavoriteBar;
