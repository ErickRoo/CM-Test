import React from 'react';
import classNames from 'classnames/bind';
import { Image } from 'greenlight-shared';
import PropTypes from 'prop-types';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Pullquote({ content }) {
  const { caption, instance } = content;

  return (
    <div className={cx('Pullquote')}>
      <div className={cx('image', `objectPosition${instance}`)}>
        <Image image={content} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: caption }} className={cx('text')} />
    </div>
  );
}

export default Pullquote;

Pullquote.propTypes = {
  content: PropTypes.shape({
    caption: PropTypes.string.isRequired,
    instance: PropTypes.number.isRequired,
  }).isRequired,
};
