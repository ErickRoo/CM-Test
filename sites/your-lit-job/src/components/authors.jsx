import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import * as Styles from './authors.module.scss';

export function hasAuthors(authors) {
  return authors && authors.length;
}

function Authors({ authors, className }) {
  if (!hasAuthors(authors)) {
    return null;
  }

  return (
    <span className={classNames(Styles.root, className)}>
      {authors.map((author, i) => {
        return (
          <span key={author.name}>
            {i > 0 && ', '}
            <span>{author.name}</span>
          </span>
        );
      })}
    </span>
  );
}

Authors.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

Authors.defaultProps = {
  authors: [],
  className: null,
};

export const query = graphql`
  fragment AuthorsFields on ContentfulAuthor {
    id
    name
  }
`;

export default Authors;
