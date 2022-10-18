import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }

  return {
    width: undefined,
    height: undefined,
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const resize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
