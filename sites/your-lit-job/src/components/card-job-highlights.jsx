import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './card-job-highlights.module.scss';

import { getHighlightsFrJob } from '../utils/carousel-utils';
import CardJobHeatIcons from './card-job-heat-icons';

function CardJobHighLights({ job, showHeatHighlight }) {
  const highlights = getHighlightsFrJob(job);

  return (
    <ul className={Styles.root}>
      {highlights?.map(({ id, title, value, className }, position) => {
        if (!showHeatHighlight && position === 3) {
          return <li key={id} />;
        }

        return (
          <li key={id} className={Styles.highlight}>
            <div className={Styles?.[`highlightLeft__${className}`]} />
            <div className={Styles.highlightRight}>
              <span>{title}</span>
              {position !== 3 ? <span>{value}</span> : <CardJobHeatIcons quantity={value} />}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

CardJobHighLights.propTypes = {
  job: PropTypes.shape({
    annualPay: PropTypes.number,
    levelEducation: PropTypes.string,
    jobOutlook: PropTypes.string,
    thisJobIs: PropTypes.number,
    industryIs: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  showHeatHighlight: PropTypes.bool,
};

CardJobHighLights.defaultProps = {
  job: {},
  showHeatHighlight: false,
};

export default CardJobHighLights;
