import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'gatsby';
import { IconChevronLeft, IconChevronRight, Image } from 'greenlight-shared';
import Markdown from '../markdown';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function HeroWork({ featuredProjectPage, handleCarouselClick, transition }) {
  const { id } = featuredProjectPage;
  const { project } = featuredProjectPage.content;

  return (
    <div key={id} className={cx('HeroWork')}>
      <div className={transition ? cx('inner', `${transition}`) : cx('inner')}>
        <div className={cx('poster')}>
          <Image image={project.featuredImage} />
        </div>
        <div className={cx('overlay')}>
          {handleCarouselClick && (
            <button className={cx('buttonLeft')} type="button" onClick={() => handleCarouselClick('decrease')}>
              <IconChevronLeft />
            </button>
          )}
          <div className={cx('overlayInner')}>
            {handleCarouselClick && (
              <button
                className={cx('buttonRight')}
                type="button"
                onClick={() => handleCarouselClick('increase')}
                aria-label="Next slide"
              >
                <IconChevronRight />
              </button>
            )}
            <div>
              <span className={cx('eyebrow')}>Featured Project</span>
              <h2>{project.titleShort}</h2>
              <div className={cx('description')}>
                <Markdown>{project.descriptionShort.descriptionShort}</Markdown>
              </div>
              <Link to={`/${featuredProjectPage.slug}`}>
                <span className={cx('button')}>Learn more</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

HeroWork.defaultProps = {
  handleCarouselClick: false,
};

HeroWork.propTypes = {
  featuredProjectPage: PropTypes.shape({
    id: PropTypes.string.isRequired,
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
  }).isRequired,
  handleCarouselClick: PropTypes.func,
  transition: PropTypes.string.isRequired,
};

export default HeroWork;
