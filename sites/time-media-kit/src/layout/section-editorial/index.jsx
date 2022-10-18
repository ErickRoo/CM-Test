import React from 'react';
import classNames from 'classnames/bind';
import { StaticImage } from 'gatsby-plugin-image';
import ScrollReveal from '../../components/scroll-reveal';
import EditorialItem from '../../components/editorial-item';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function EditorialSection({ content }) {
  const { items } = content;

  return (
    <div className={cx('EditorialSection')}>
      <div className={cx('bgImg')}>
        <StaticImage src="../../images/editorial-bg.png" alt="" />
      </div>
      <div className={cx('items')}>
        {items.map((item) => (
          <ScrollReveal key={item.id}>
            <EditorialItem item={item} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

export default EditorialSection;
