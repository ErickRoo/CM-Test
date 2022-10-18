import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useScrollYPosition } from 'react-use-scroll-position/index';
import { useWindowSize } from '@react-hook/window-size';

function TrackImpression({ element, onImpression }) {
  const scrollY = useScrollYPosition();
  const resize = useWindowSize();
  const [seen, setSeen] = useState(false);

  const isVisible = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  useEffect(() => {
    if (!seen && isVisible(element.current)) {
      setSeen(true);
      onImpression();
    }
  }, [scrollY, resize]);

  return null;
}

TrackImpression.propTypes = {
  onImpression: PropTypes.func.isRequired,
  element: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    current: PropTypes.any,
  }).isRequired,
};

export default TrackImpression;
