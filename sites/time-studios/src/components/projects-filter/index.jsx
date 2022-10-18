import React, {useState} from 'react';
import classNames from 'classnames/bind';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function ProjectsFilter({ projectTypes, currentFilter, onClickFilter }) {
  const [filtersShown, setFiltersShown] = useState(false);

  const onClickOpenFilters = () => {
    setFiltersShown(!filtersShown);
  };

  return (
    <ul className={cx('ProjectsFilter')}>
      <ul>
        <li className={cx('currentFilter')} onClick={onClickOpenFilters}>
          <span>
            {currentFilter}
            {currentFilter === 'all' ? <span className={cx('mobileAddition')}>&nbsp;projects</span> : null}
          </span>
          <span className={cx('caret', { open: filtersShown })} />
        </li>
        <li
          className={cx({ active: currentFilter === 'all', shown: filtersShown })}
          onClick={() => {
            onClickFilter('all');
            setFiltersShown(false);
          }}
        >
          <span>
            all<span className={cx('mobileAddition')}>&nbsp;projects</span>
          </span>
        </li>
        {projectTypes.map((type, idx) => {
          const keyId = `${type.id}-${idx}`;
          return (
            <li
              className={cx({ active: type === currentFilter, shown: filtersShown })}
              key={keyId}
              onClick={() => {
                onClickFilter(type);
                setFiltersShown(false);
              }}
            >
              <span>{type}</span>
            </li>
          );
        })}
      </ul>
    </ul>
  );
}

export default ProjectsFilter;
