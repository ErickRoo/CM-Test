import React, { useEffect } from 'react';
import { useScrollYPosition } from 'react-use-scroll-position/index';
import { InstantSearch, SearchBox, Hits, useInstantSearch } from 'react-instantsearch-hooks-web';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './index.module.scss';
import { useSite } from '../../contexts/SiteContext';
import Post from '../../components/post';

const algoliaClient = algoliasearch(process.env.GATSBY_YLJ_ALGOLIA_APP_ID, process.env.GATSBY_YLJ_ALGOLIA_SEARCH_KEY);
const indexName = process.env.GATSBY_YLJ_ALGOLIA_PRIMARY_INDEX;

const searchClient = {
  ...algoliaClient,
  search(requests) {
    return algoliaClient.search(requests);
  },
};

// eslint-disable-next-line react/prop-types
function EmptyQueryBoundary({ children }) {
  const { indexUiState, results } = useInstantSearch();

  if (!indexUiState.query) {
    return <p className={Styles.noResults}>Type a word to begin your search.</p>;
  }

  // eslint-disable-next-line no-underscore-dangle
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        <p className={Styles.notFound}>No exact matches found.</p>
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}

function Search() {
  const scrollY = useScrollYPosition();
  const { back, indexScrollPosition, setIndexScrollPosition } = useSite();

  useEffect(() => {
    if (back) {
      window.requestAnimationFrame(() => {
        setTimeout(() => {
          // Unfortunate hack, but resolves issue with scrolling to incorrect position
          window.scrollTo(0, indexScrollPosition);
        }, 100);
      });
    }
  }, []);

  useEffect(() => {
    setIndexScrollPosition(window.scrollY);
  }, [scrollY]);

  return (
    <div className={Styles.root}>
      <InstantSearch searchClient={searchClient} indexName={indexName} routing>
        <SearchBox
          placeholder="Search"
          classNames={{
            root: Styles.rootAlgolia,
            form: Styles.formSearchBar,
            input: Styles.searchBar,
            submit: Styles.submit,
            resetIcon: Styles.resetIcon,
          }}
          autoFocus
          searchAsYouType={false}
        />
        <div className={classNames(Styles.posts, 'container')}>
          <EmptyQueryBoundary>
            <Hits
              hitComponent={Post}
              classNames={{
                item: Styles.item,
                emptyRoot: Styles.emptyRoot,
              }}
            />
          </EmptyQueryBoundary>
        </div>
      </InstantSearch>
    </div>
  );
}
EmptyQueryBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Search;
