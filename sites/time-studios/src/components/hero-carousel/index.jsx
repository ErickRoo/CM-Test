import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { DetectSwipe } from 'greenlight-shared';
import * as styles from './styles.module.scss';
import HeroWork from '../hero-work';

const cx = classNames.bind(styles);

function HeroCarousel({ featuredProjects }) {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [transition, setTransition] = useState(false);
  const { onTouchStart, onTouchMove, onTouchEnd } = DetectSwipe();

  useEffect(() => {
    // Set 15 second interval to auto slide the carousel
    const interval = setInterval(() => {
      const index = featuredProjects.length <= currentProjectIndex + 1 ? 0 : currentProjectIndex + 1;
      if (transition !== 'animateLeft') setTransition('animateLeft');
      setCurrentProjectIndex(index);
    }, 15000);

    return () => clearInterval(interval);
  }, [currentProjectIndex]);

  const handleCarouselClick = (direction) => {
    if (direction === 'increase') {
      setTransition('animateRight');
      return currentProjectIndex === 0
        ? setCurrentProjectIndex(featuredProjects.length - 1)
        : setCurrentProjectIndex(currentProjectIndex - 1);
    }

    if (direction === 'decrease') {
      setTransition('animateLeft');
      return featuredProjects.length <= currentProjectIndex + 1
        ? setCurrentProjectIndex(0)
        : setCurrentProjectIndex(currentProjectIndex + 1);
    }

    return false;
  };

  const handleLabelOnClick = (index) => {
    if (index > currentProjectIndex) setTransition('animateLeft');
    if (index < currentProjectIndex) setTransition('animateRight');

    setCurrentProjectIndex(index);
  };

  return (
    <>
      <div
        className={cx('HeroCarousel')}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() =>
          onTouchEnd(
            () => handleCarouselClick('increase'),
            () => handleCarouselClick('decrease')
          )
        }
      >
        <HeroWork
          featuredProjectPage={featuredProjects[currentProjectIndex]}
          handleCarouselClick={handleCarouselClick}
          transition={transition}
        />
      </div>
      <div className={cx('HeroCarouselSelectors')}>
        <form>
          <nav>
            {featuredProjects.map((item, index) => {
              const { id } = item;
              return (
                <>
                  <input name="carousel-item" key={id} type="radio" checked={currentProjectIndex === index} />
                  <label onClick={() => handleLabelOnClick(index)} htmlFor="carousel-item" id={id} />
                </>
              );
            })}
          </nav>
        </form>
      </div>
    </>
  );
}

HeroCarousel.propTypes = {
  featuredProjects: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      content: PropTypes.shape({
        project: PropTypes.shape({
          descriptionShort: PropTypes.shape({
            descriptionShort: PropTypes.string,
          }),
          featuredImage: PropTypes.shape({
            title: PropTypes.string,
          }),
          titleShort: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
};

export default HeroCarousel;
