import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import ProjectGridItem from '../../project-grid-item';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function SectionProjectRelated({ relatedProjectPages }) {
  const relatedProjectPagesList = relatedProjectPages;
  // const relatedProjectPagesList = [relatedProjectPages[0], relatedProjectPages[0]];

  return (
    <div className={cx('SectionProjectRelated')}>
      <div className={cx('inner')}>
        <div className={cx('relatedWrapper')}>
          <h2>Additional Work</h2>
          <ul>
            {relatedProjectPagesList.map((page) => {
              return (
                <ProjectGridItem
                  key={page.slug}
                  projectPage={page}
                  aspectRatio="16x9"
                  theme="small"
                  image={page.content.project.featuredImage}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

SectionProjectRelated.propTypes = {
  relatedProjectPages: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      content: PropTypes.shape({
        project: PropTypes.shape({
          titleShort: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default SectionProjectRelated;
