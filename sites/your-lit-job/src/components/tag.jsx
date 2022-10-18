import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { stripTagParents, toSlug } from '../utils/tag';
import { trackEvent } from '../utils/track';

function Tag({ tag, link }) {
  const name = stripTagParents(tag.name);

  if (link) {
    return (
      <Link
        to={(tag?.isNavbarTag ? '/industries/' : '/') + toSlug(name)}
        onClick={() => trackEvent('Tag click', 'Content Action', tag.name)}
      >
        {name}
      </Link>
    );
  }
  return <span>{name}</span>;
}

Tag.propTypes = {
  tag: PropTypes.shape({
    name: PropTypes.string,
    isNavbarTag: PropTypes.bool,
  }).isRequired,
  link: PropTypes.bool,
};

Tag.defaultProps = {
  link: true,
};

export default Tag;
