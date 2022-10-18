import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Image } from 'greenlight-shared';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function SectionOpener({ content }) {
  const data = {
    ...content[0],
    ...content[1],
  };

  const { caption, sectionContent, name, location, byline, photoCredit } = data;

  return (
    <div className={cx('SectionOpener')}>
      <div className={cx('left')}>
        <div className={cx('imageContainer')}>
          <div className={cx('image')}>
            <Image image={data} />
            <div className={cx('imageOverlay')}>
              <h3>{name}</h3>
              <p className={cx('location')}>{location}</p>
              <span className={cx('borderLeft')}>
                <p className={cx('byline')}>{byline}</p>
                <p className={cx('photoCredit')}>{photoCredit}</p>
              </span>
            </div>
          </div>
          <p dangerouslySetInnerHTML={{ __html: caption }} className={cx('caption')} />
        </div>
      </div>
      <div className={cx('right')}>
        <div className={cx('text')}>
          <div className={cx('imageInfo')}>
            <h3>{name}</h3>
            <p className={cx('location')}>{location}</p>
            <span className={cx('borderLeft')}>
              <p className={cx('byline')}>{byline}</p>
              <p className={cx('photoCredit')}>{photoCredit}</p>
            </span>
          </div>
          {sectionContent.map((paragraph) => {
            return (
              <>
                <p dangerouslySetInnerHTML={{ __html: paragraph }} />
                <br />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SectionOpener;

SectionOpener.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        type: PropTypes.string,
        name: PropTypes.string,
        location: PropTypes.string,
        byline: PropTypes.string,
        photoCredit: PropTypes.string,
        sectionContent: PropTypes.arrayOf(PropTypes.string),
      }),
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
      }),
    ])
  ).isRequired,
};
