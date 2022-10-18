import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { setPageDimensions } from '../utils/track';
import { useAuth } from '../contexts/AuthContext';

function PageDimensions({ dimensions }) {
  const { user, isLoaded } = useAuth();
  const modifiedDimensions = dimensions;

  useEffect(() => {
    if (isLoaded) {
      if (user && user.uid) {
        modifiedDimensions.userId = user.uid;
      }

      setPageDimensions(modifiedDimensions);
    }
  }, [isLoaded]);

  return null;
}

PageDimensions.propTypes = {
  dimensions: PropTypes.shape({}).isRequired,
};

export default PageDimensions;
