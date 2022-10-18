import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'gatsby';
import { Image } from 'greenlight-shared';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function ProjectGridItem({ projectPage, aspectRatio, theme, image }) {
  return (
    <li className={cx('ProjectGridItem', theme)}>
      <Link to={`/${projectPage.slug}`}>
        <div className={cx('image', `aspect${aspectRatio}`)}>
          <Image image={image} />
        </div>

        <div className={cx('overlay')}>
          {theme === 'small' ? <h3 className={cx('title')}>{projectPage.content.project.titleShort}</h3> : null}

          {theme === 'large' ? <h2 className={cx('title')}>{projectPage.content.project.titleShort}</h2> : null}
        </div>
      </Link>
    </li>
  );
}

ProjectGridItem.propTypes = {
  projectPage: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    content: PropTypes.shape({
      project: PropTypes.shape({
        titleShort: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  aspectRatio: PropTypes.oneOf(['16x9', '2x1', '2x3']).isRequired,
  theme: PropTypes.oneOf(['small', 'large']).isRequired,
};

export default ProjectGridItem;
