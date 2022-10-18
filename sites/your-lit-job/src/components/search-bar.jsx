import React from 'react';
import { navigate } from 'gatsby';
import * as Styles from './search-bar.module.scss';

function SearchBar() {
  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const searchWord = ev?.target?.[0]?.value || '';
    await navigate(`/search?q=${searchWord}`);
  };

  return (
    <div className={Styles.root}>
      <form className={Styles.formSearchBar} onSubmit={handleSubmit}>
        <input className={Styles.searchBar} type="search" placeholder="Search" pattern=".{3,}" />
        <button className={Styles.searchButton} aria-label="button-search" type="submit" />
      </form>
    </div>
  );
}

SearchBar.propTypes = {};

SearchBar.defaultProps = {};

export default SearchBar;
