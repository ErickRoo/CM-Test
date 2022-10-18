import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'gatsby';
import * as styles from './styles.module.scss';
import PressList from '../../press-list';

const cx = classNames.bind(styles);

function SectionPressList({ items, projectPages, showRubric, showMoreButton, pressPage }) {
  return (
    <div className={cx('SectionPressList')}>
      <div className={cx('inner')}>
        <div className={cx('pressListWrapper')}>
          {showRubric ? <span className={cx('eyebrow')}>Press</span> : null}
          <PressList items={items} projectPages={projectPages} suppressProjectLink={showMoreButton} />
          {showMoreButton && pressPage && pressPage.slug ? (
            <Link to={`/${pressPage.slug}`}>
              <span className={cx('button', 'secondary')}>Additional Press</span>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SectionPressList;
