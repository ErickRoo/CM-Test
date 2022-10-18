import React from 'react';
import { navigate } from 'gatsby';
import * as Styles from './summary-feed.module.scss';
import Heading from '../../heading';
import Button from '../../button';
import { trackEvent } from '../../../utils/track';
import boxImages from '../../../utils/color-box-images';
import CuratedCtaVideo from '../../../assets/components/summary-feed/curated-cta.mp4';

function SummaryFeed() {
  const handleFeed = () => {
    trackEvent('View curated feed', 'Skills Explorer');
    navigate('/');
  };

  return (
    <div className={Styles.root}>
      <video autoPlay muted className={Styles.video} loop>
        <source src={CuratedCtaVideo} type="video/mp4" />
      </video>
      <Heading level={3}>Your results will guide the way.</Heading>
      <p>Your newsfeed has been tailored to your skills and interests.</p>
      <div className={Styles.content}>
        {boxImages?.map((item, index) => {
          const key = `box-image-item-${index}`;
          return (
            <div key={key} className={Styles.items}>
              <img src={item.img} alt={item?.title} />
              <p>{item?.title}</p>
            </div>
          );
        })}
      </div>
      <Button type="button" theme="green" action={() => handleFeed()}>
        Take me to my feed!
      </Button>
    </div>
  );
}

SummaryFeed.propTypes = {};

SummaryFeed.defaultProps = {};

export default SummaryFeed;
