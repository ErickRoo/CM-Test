import React from 'react';
import classNames from 'classnames/bind';
import { Image } from 'greenlight-shared';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function TeamGridItem({ person, onClick }) {
  return (
    <div
      className={cx('TeamGridItem')}
      onClick={() => {
        onClick(person);
      }}
    >
      <div className={cx('image')}>{person.photo ? <Image image={person.photo} /> : null}</div>
      <div className={cx('text')}>
        <span className={cx('rule')} />
        <span className={cx('ruleName')} />
        <span className={cx('name')}>{person.fullName}</span>
        <span className={cx('title')}>{person.title}</span>
      </div>
    </div>
  );
}

export default TeamGridItem;
