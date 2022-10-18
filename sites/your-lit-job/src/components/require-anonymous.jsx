import { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';

function RequireAnonymous({ to, children }) {
  const { isSignedIn, isLoaded } = useAuth();
  const [isExempt, setIsExempt] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate(to, { replace: true });
    } else if (isLoaded && !isSignedIn) {
      setIsExempt(true);
    }
  }, [isLoaded, isSignedIn, to]);

  return isExempt ? children : null;
}

RequireAnonymous.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

RequireAnonymous.defaultProps = {
  to: '/',
  children: null,
};

export default RequireAnonymous;
