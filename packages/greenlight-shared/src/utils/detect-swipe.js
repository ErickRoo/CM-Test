import { useState } from 'react';

const DetectSwipe = () => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = (leftSwipeHandler, rightSwipeHandler) => {
    if (!touchStart || !touchEnd) return;
    const swipeDistance = touchStart - touchEnd;
    const swipeLeft = swipeDistance > minSwipeDistance;
    const swipeRight = swipeDistance < -minSwipeDistance;
    if (swipeRight) {
      leftSwipeHandler();
    }

    if (swipeLeft) {
      rightSwipeHandler();
    }
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};

export default DetectSwipe;
