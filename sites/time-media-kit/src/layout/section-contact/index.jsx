/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import classNames from 'classnames/bind';
import ScrollReveal from '../../components/scroll-reveal';
import formatLineBreaks from '../../utils/format-line-breaks';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

// adapted from https://stackoverflow.com/a/7123542
const insertLinks = (text) => {
  const urlPattern = /\b(?:https?):\/\/[a-z0-9-+&@#/%?=~_|!:,.;]*[a-z0-9-+&@#/%=~_|]/gim;
  const emailPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

  return text.replace(urlPattern, '<a href="$&">$&</a>').replace(emailPattern, '<a href="mailto:$&">$&</a>');
};

function ContactColumn({ content }) {
  return (
    <div className={cx('column')}>
      {content.map((item) => (
        <div key={item.id} className={cx('item')}>
          <div className={cx('title')}>{item.title}</div>
          <div
            className={cx('info')}
            dangerouslySetInnerHTML={{ __html: insertLinks(formatLineBreaks(item.info.info)) }}
          />
        </div>
      ))}
    </div>
  );
}

function ContactSection({ content }) {
  const { column1, column2, column3 } = content;

  return (
    <ScrollReveal threshold={0.05}>
      <div className={cx('ContactSection')}>
        <ContactColumn content={column1} />
        <ContactColumn content={column2} />
        <ContactColumn content={column3} />
      </div>
    </ScrollReveal>
  );
}

export default ContactSection;
