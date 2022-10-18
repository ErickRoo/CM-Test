import React from 'react';
import { InstantSearch, SearchBox, Hits, useInstantSearch } from 'react-instantsearch-hooks-web';
import algoliasearch from 'algoliasearch/lite';
import classNames from 'classnames';
import * as Styles from './index.module.scss';

// import MetaTitle from '../../components/meta-title';
// import ColorBar from '../../components/color-bar';
// import PageDimensions from '../../components/page-dimensions';
// import SearchBar from '../../components/search-bar';
import Post from '../../components/post';
// import SkillsLoading from '../../components/elements/SkillsLoading/skills-loading';

const algoliaClient = algoliasearch(process.env.GATSBY_YLJ_ALGOLIA_APP_ID, process.env.GATSBY_YLJ_ALGOLIA_SEARCH_KEY);
const indexName = process.env.GATSBY_YLJ_ALGOLIA_PRIMARY_INDEX;

const searchClient = {
  ...algoliaClient,
  search(requests) {
    return algoliaClient.search(requests);
  },
};

// const routing = {
//   router: history(),
//   stateMapping: simple(),
// };

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
  return (
    <div className={Styles.root}>
      {/* <PageDimensions dimensions={pageDimensions} /> */}
      {/* <MetaTitle title={page?.metaTitle ?? page?.title ?? ''} /> */}
      {/*
      <MetaDescription description={page?.metaDescription} />
      <MetaKeywords keywords={page?.metaKeywords} />
      <CanonicalUrl url={page?.canonicalUrl} />
      <MetaImage />
      */}
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

export default Search;
