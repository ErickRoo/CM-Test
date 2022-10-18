import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Image } from 'greenlight-shared';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function SingleColumn({ content }) {
  const { type, sectionContent } = content;

  if (type === 'text') {
    return (
      <div className={cx('Text')}>
        {sectionContent.map((paragraph) => {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: paragraph }} />
              <br />
            </>
          );
        })}
      </div>
    );
  }

  if (type === 'image' || type === 'mobile-image' || type === 'triptych') {
    const { caption } = sectionContent;

    let className = 'Image';

    if (type === 'mobile-image') {
      className = 'ImageMobile';
    }

    if (type === 'triptych') {
      className = 'Triptych';
    }

    return (
      <div className={cx(className)}>
        <Image image={sectionContent} />
        <span dangerouslySetInnerHTML={{ __html: caption }} />
      </div>
    );
  }
}

export default SingleColumn;

SingleColumn.propTypes = {
  content: PropTypes.shape({
    section: PropTypes.string,
    type: PropTypes.string,
    sectionContent: PropTypes.oneOfType([
      PropTypes.string,
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
    ]),
  }).isRequired,
};
