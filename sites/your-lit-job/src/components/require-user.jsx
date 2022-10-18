import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
// eslint-disable-next-line import/no-unresolved
import { useLocation } from '@reach/router';
import { useAuth } from '../contexts/AuthContext';
import { useSite } from '../contexts/SiteContext';

function RequireUser({ to, children }) {
  const { isSignedIn, isLoaded } = useAuth();
  const location = useLocation();
  const { setStashURL } = useSite();
  const [isExempt, setIsExempt] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      setStashURL(location.pathname);
      navigate(to, { replace: true });
    } else if (isLoaded && isSignedIn) {
      setIsExempt(true);
    }
  }, [isLoaded, isSignedIn, to]);

  return isExempt ? children : null;
}

RequireUser.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

RequireUser.defaultProps = {
  to: '/',
  children: null,
};

export default RequireUser;
