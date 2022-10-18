import React from 'react';
import classNames from 'classnames/bind';
import * as styles from './styles.module.scss';
import PressListItem from './press-list-item';

const cx = classNames.bind(styles);

function PressList({ items, projectPages = [], suppressProjectLink }) {
  return (
    <ul className={cx('PressList')}>
      {items.map((item) => {
        const projectPage =
          !suppressProjectLink &&
          projectPages.find((page) => {
            const projectId = item.project && item.project.id;
            return page.content.project.id === projectId;
          });

        return (
          <PressListItem
            key={item.headline}
            date={item.date}
            publication={item.publication}
            headline={item.headline}
            link={item.link}
            projectPage={projectPage}
          />
        );
      })}
    </ul>
  );
}

export default PressList;
