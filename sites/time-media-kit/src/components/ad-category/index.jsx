/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import ScrollReveal from '../scroll-reveal';
import Image from '../image';
import DownloadButton from '../download-button';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function AdCategory({ category, categoryIndex, getItemIndex, setActiveItemIndex, setModalStatus }) {
  const [opened, setOpened] = useState(false);

  return (
    <div key={category.id} className={cx('AdCategory', { opened })}>
      <ScrollReveal>
        <div
          className={cx('categoryHeader')}
          onClick={() => { setOpened(!opened) }}
        >
          <h3 className={cx('categoryTitle')}>{category.title}</h3>
          {category.downloadUrl && category.downloadText && (
            <DownloadButton url={category.downloadUrl} text={category.downloadText} />
          )}
          <div className={cx('arrowIcon')}>
            <div className={cx('arrowIconInner')} />
          </div>
        </div>
      </ScrollReveal>
      <div className={cx('categoryItems')}>
        {category.items.map((item, itemIndex) => (
          <ScrollReveal key={item.id}>
            <div
              className={cx('item')}
              onClick={() => {
                setActiveItemIndex(getItemIndex(categoryIndex, itemIndex))
                setModalStatus('opened');
              }}
            >
              <Image image={item.icon} />
              <div className={cx('itemTitle')}>{item.title}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

export default AdCategory;
