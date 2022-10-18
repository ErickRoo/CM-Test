import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'gatsby';
import { Image } from 'greenlight-shared';
import Markdown from '../../markdown';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function SectionFeaturedProject({ featuredProjectPage, workPage }) {
  return (
    <div className={cx('SectionFeaturedProject')}>
      <div className={cx('inner')}>
        <div className={cx('imageWrapper')}>
          <Link to={`/${featuredProjectPage.slug}`}>
            <Image image={featuredProjectPage.content.project.featuredImage} />
          </Link>
        </div>
        <div className={cx('titleWrapper')}>
          <span className={cx('eyebrow')}>Featured Project</span>
          <h2>{featuredProjectPage.content.project.titleShort}</h2>
        </div>
        <div className={cx('infoWrapper')}>
          <div className={cx('description')}>
            <Markdown>{featuredProjectPage.content.project.descriptionShort.descriptionShort}</Markdown>
          </div>

          <div className={cx('actions')}>
            <Link to={`/${featuredProjectPage.slug}`}>
              <span className={cx('button', 'primary')}>Learn More</span>
            </Link>

            {workPage && workPage.slug ? (
              <Link to={`/${workPage.slug}`}>
                <span className={cx('button', 'secondary')}>Additional Work</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionFeaturedProject;
