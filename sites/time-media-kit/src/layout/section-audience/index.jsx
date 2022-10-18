/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import classNames from 'classnames/bind';
import { StaticImage } from 'gatsby-plugin-image';
import ScrollReveal from '../../components/scroll-reveal';
import Image from '../../components/image';
import AudienceCarousel from '../../components/audience-carousel';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function SocialItem({ name, number }) {
  // StaticImage src must be determined at build time
  const getIcon = (socialName) => {
    if (socialName === 'Twitter') {
      return <StaticImage src="../../images/social-twitter.png" alt="Twitter" />;
    }
    if (socialName === 'Instagram') {
      return <StaticImage src="../../images/social-instagram.png" alt="Instagram" />;
    }
    if (socialName === 'Line') {
      return <StaticImage src="../../images/social-line.png" alt="Line" />;
    }
    if (socialName === 'Facebook') {
      return <StaticImage src="../../images/social-facebook.png" alt="Facebook" />;
    }
    if (socialName === 'LinkedIn') {
      return <StaticImage src="../../images/social-linkedin.png" alt="LinkedIn" />;
    }
    if (socialName === 'YouTube') {
      return <StaticImage src="../../images/social-youtube.png" alt="YouTube" />;
    }
    return null;
  };

  return (
    <div className={cx('item')}>
      <div className={cx('icon')}>{getIcon(name)}</div>
      <div className={cx('number')}>
        {number} <span className={cx('million')}>&nbsp;Million</span>
      </div>
    </div>
  );
}

function MapCallout({ region, number }) {
  return (
    <div className={cx('mapCallout', `readers${region}`)}>
      <ScrollReveal>
        <div className={cx('mapCalloutInner')}>
          <div className={cx('title')}>{region.toUpperCase()}</div>
          <div className={cx('number')}>
            {number} Million<sup>1</sup>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

function BrandReachRow({ region, footnote, number, genderChart, ageChart }) {
  return (
    <ScrollReveal>
      <div className={cx('row')}>
        <div className={cx('rowTitle')}>
          {region} Brand Reach<sup>{footnote}</sup>
        </div>
        <AudienceCarousel
          title={`${region} Brand Reach`}
          footnote={footnote}
          number={number}
          genderChart={genderChart}
          ageChart={ageChart}
        />
      </div>
    </ScrollReveal>
  );
}

function AudienceSection({ content }) {
  const {
    globalChart,
    globalNumber,
    globalDescription,
    socialNumber,
    socialNumberTwitter,
    socialNumberInstagram,
    socialNumberLine,
    socialNumberFacebook,
    socialNumberLinkedIn,
    socialNumberYouTube,
    readersNumber,
    readersNumberUs,
    readersNumberEmea,
    readersNumberApac,
    brandReachNumberUs,
    brandReachChartUsGender,
    brandReachChartUsAge,
    brandReachNumberEmea,
    brandReachChartEmeaGender,
    brandReachChartEmeaAge,
    brandReachNumberApac,
    brandReachChartApacGender,
    brandReachChartApacAge,
    sourceUs,
    sourceEmea,
    sourceApac,
    sourceGlobal,
  } = content;

  return (
    <div className={cx('AudienceSection')}>
      <ScrollReveal>
        <div className={cx('global')}>
          <div className={cx('globalHeader')}>
            <div className={cx('number')}>{globalNumber} Million</div>
            <div className={cx('title')}>Global TIME Community</div>
            <div className={cx('description')}>{globalDescription}</div>
          </div>
          <div className={cx('globalChart')}>
            <Image image={globalChart} />
          </div>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div className={cx('social')}>
          <div className={cx('socialHeader')}>
            <div className={cx('number')}>{socialNumber} Million</div>
            <div className={cx('title')}>Social Media Followers</div>
          </div>
          <div className={cx('socialItems')}>
            <SocialItem name="Twitter" number={socialNumberTwitter} />
            <SocialItem name="Instagram" number={socialNumberInstagram} />
            <SocialItem name="Line" number={socialNumberLine} />
            <SocialItem name="Facebook" number={socialNumberFacebook} />
            <SocialItem name="LinkedIn" number={socialNumberLinkedIn} />
            <SocialItem name="YouTube" number={socialNumberYouTube} />
          </div>
        </div>
      </ScrollReveal>
      <div className={cx('readers')}>
        <div className={cx('mapContainer')}>
          <div className={cx('map')}>
            <StaticImage src="../../images/map.png" alt="" />
          </div>
          <div className={cx('readersHeader')}>
            <ScrollReveal>
              <div className={cx('number')}>{readersNumber} Million</div>
              <div className={cx('title')}>Print and Digital Readers</div>
            </ScrollReveal>
          </div>
          <MapCallout region="Us" number={readersNumberUs} />
          <MapCallout region="Emea" number={readersNumberEmea} />
          <MapCallout region="Apac" number={readersNumberApac} />
        </div>
      </div>
      <div className={cx('brandReach')}>
        <BrandReachRow
          region="US"
          footnote="1"
          number={brandReachNumberUs}
          genderChart={brandReachChartUsGender}
          ageChart={brandReachChartUsAge}
        />
        <BrandReachRow
          region="EMEA"
          footnote="2"
          number={brandReachNumberEmea}
          genderChart={brandReachChartEmeaGender}
          ageChart={brandReachChartEmeaAge}
        />
        <BrandReachRow
          region="APAC"
          footnote="3"
          number={brandReachNumberApac}
          genderChart={brandReachChartApacGender}
          ageChart={brandReachChartApacAge}
        />
      </div>
      <ScrollReveal>
        <div className={cx('sources')}>
          <div>
            <sup>1</sup>
            Source: {sourceUs}
          </div>
          <div>
            <sup>2</sup>
            Source: {sourceEmea}
          </div>
          <div>
            <sup>3</sup>
            Source: {sourceApac}
          </div>
          <div>* {sourceGlobal}</div>
        </div>
      </ScrollReveal>
    </div>
  );
}

export default AudienceSection;
