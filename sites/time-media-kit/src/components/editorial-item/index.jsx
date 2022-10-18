/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import classNames from 'classnames/bind';
import Image from '../image';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function EditorialItem({ item }) {
  const formatTitle = (title) => title.replaceAll(/time/gi, '<span class="time-red">TIME</span>');

  return (
    <div className={cx('EditorialItem')}>
      <Image image={item.image} url={item.url} />
      <div>
        <a href={item.url}>
          <h3 className={cx('title')} dangerouslySetInnerHTML={{ __html: formatTitle(item.title) }}/>
        </a>
        <div className={cx('description')}>{item.description.description}</div>
      </div>
    </div>
  );
}

export default EditorialItem;
