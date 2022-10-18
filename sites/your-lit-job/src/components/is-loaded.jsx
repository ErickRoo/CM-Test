import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';

function IsLoaded({ children, visibility }) {
  const { isLoaded } = useAuth();

  if (visibility) {
    return <div style={{ visibility: isLoaded ? '' : 'hidden' }}>{children}</div>;
  }

  return isLoaded ? children : null;
}

IsLoaded.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  visibility: PropTypes.bool,
};

IsLoaded.defaultProps = {
  children: null,
  visibility: false,
};

export default IsLoaded;
