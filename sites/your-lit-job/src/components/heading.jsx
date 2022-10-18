import React from 'react';
import PropTypes from 'prop-types';

function Heading({ children, level, className, id }) {
  if (!children) {
    return null;
  }

  const tagName = () => {
    return level ? `h${level}` : `div`;
  };

  return React.createElement(tagName(), { className, id }, children);
}

Heading.propTypes = {
  level: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
};

Heading.defaultProps = {
  level: 0,
  className: null,
  id: null,
};

export default Heading;
