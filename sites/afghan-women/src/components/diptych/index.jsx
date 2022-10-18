import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Image } from 'greenlight-shared';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Diptych({ content }) {
  const { images, desktopCaption } = content;
  return (
    <div className={cx('Diptych')}>
      <div className={cx('images')}>
        {images.map((image) => {
          const { caption } = image;
          return (
            <div className={cx('imageBlock')}>
              <Image image={image} />
              <span dangerouslySetInnerHTML={{ __html: caption }} className={cx('caption', 'mobile')} />
            </div>
          );
        })}
      </div>
      <span dangerouslySetInnerHTML={{ __html: desktopCaption }} className={cx('caption', 'desktop')} />
    </div>
  );
}

export default Diptych;

Diptych.propTypes = {
  content: PropTypes.shape({
    caption: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        gatsbyImageData: PropTypes.shape({
          images: PropTypes.shape({
            sources: PropTypes.arrayOf(
              PropTypes.shape({
                srcSet: PropTypes.string,
                sizes: PropTypes.string,
                type: PropTypes.string,
              })
            ),
            fallback: PropTypes.shape({
              src: PropTypes.string,
              srcSet: PropTypes.string,
              sizes: PropTypes.string,
            }),
          }),
        }),
      })
    ).isRequired,
  }).isRequired,
};
