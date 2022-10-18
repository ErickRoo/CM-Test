import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import * as Styles from './tags.module.scss';
import { filterTagsByParent, sortTagsByName } from '../utils/tag';
import { searchNavbarIndustryByTagName } from '../utils/industries';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import Tag from './tag';

export const defaultAllowedParents = ['industry']; // By default only industry tags are visible

export function filterTags(tags, allowedParents) {
  return filterTagsByParent(tags, allowedParents);
}

function filterTagsByNavbarTag(filteredTags) {
  return filteredTags.map((tag) => {
    const isNavbarTag = searchNavbarIndustryByTagName(tag.name);
    return {
      ...tag,
      isNavbarTag: !!isNavbarTag,
    };
  });
}

function Tags({ tags, allowedParents, className }) {
  const filteredTags = sortTagsByName(filterTags(tags, allowedParents));
  const filteredTagsByNavbarTags = filterTagsByNavbarTag(filteredTags);

  if (!filteredTagsByNavbarTags.length) {
    return null;
  }

  return (
    <ul className={classNames(Styles.root, className)}>
      {filteredTagsByNavbarTags.map((tag) => {
        return (
          <li className={Styles.tag} key={tag.id}>
            <Tag tag={tag} />
          </li>
        );
      })}
    </ul>
  );
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      contentful_id: PropTypes.string,
    })
  ).isRequired,
  allowedParents: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

Tags.defaultProps = {
  allowedParents: defaultAllowedParents,
  className: null,
};

export const query = graphql`
  fragment TagsFields on ContentfulTag {
    id
    name
    contentful_id
  }
`;

export default Tags;
