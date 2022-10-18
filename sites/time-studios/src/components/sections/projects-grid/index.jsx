import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ProjectGridItem from '../../project-grid-item';
import useWindowSize from '../../../utils/useWindowSize';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

let prevFilter = null;
let timeout = null;

function SectionProjectsGrid({ projectPages, currentFilter }) {
  const [innerClass, setInnerClass] = useState('idle');
  const windowSize = useWindowSize();

  useEffect(() => {
    setInnerClass('idle');

    window.clearInterval(timeout);

    timeout = window.setTimeout(() => {
      setInnerClass('animate');
      if (currentFilter !== prevFilter) {
        prevFilter = currentFilter;
      }
    }, 125);

    return () => {
      window.clearInterval(timeout);
    };
  }, [currentFilter]);

  const shouldPadBottom = (() => {
    const w = windowSize.width;
    const h = windowSize.height;
    const isEven = projectPages.length > 0 && projectPages.length % 2 === 0;

    if (w && h) {
      // xxlarge+ (3-column)
      // 2, 5, 8, 11, ...
      if (w >= 1280 && (projectPages.length - 1) % 3 > 0) {
        return true;
      }

      // medium+ (2-column)
      if (w >= 768 && isEven) {
        return true;
      }
    }

    // all else (1-column)
    return false;
  })();

  return (
    <div className={cx('SectionProjectsGrid', { padBottom: shouldPadBottom })}>
      <div className={cx('inner', innerClass)}>
        <ul>
          {projectPages.map((page) => {
            return (
              <ProjectGridItem
                key={page.slug}
                projectPage={page}
                aspectRatio="2x3"
                theme="large"
                image={page.content.project.posterImage}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

SectionProjectsGrid.propTypes = {
  projectPages: PropTypes.arrayOf(
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

export default SectionProjectsGrid;
