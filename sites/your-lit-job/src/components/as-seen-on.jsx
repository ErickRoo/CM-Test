import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { StaticImage } from 'gatsby-plugin-image';
import * as Styles from './as-seen-on.module.scss';

function AsSeenOn({ source, className }) {
  if (!source) {
    return null;
  }

  return (
    <div className={classNames(Styles.root, className)}>
      {source === 'tfk' && (
        <div className={Styles.tfk}>
          <span>As seen on</span>
          <StaticImage
            src="../assets/components/as-seen-on/kids-logo.png"
            alt="Time for Kids"
            layout="fixed"
            width={85}
            height={14}
            className={Styles.icon}
          />
        </div>
      )}
      {source === 'edge' && (
        <div className={Styles.edge}>
          <span>As seen on</span>
          <StaticImage
            src="../assets/components/as-seen-on/edge-logo.png"
            alt="Time Edge"
            layout="fixed"
            width={78}
            height={14}
            className={Styles.icon}
          />
        </div>
      )}
      {source === 'time' && (
        <div className={Styles.time}>
          <span>As seen on</span>
          <StaticImage
            src="../assets/components/as-seen-on/time-logo.png"
            alt="Time"
            layout="fixed"
            width={41}
            height={12}
            className={Styles.icon}
          />
        </div>
      )}
    </div>
  );
}

AsSeenOn.propTypes = {
  source: PropTypes.string,
  className: PropTypes.string,
};

AsSeenOn.defaultProps = {
  source: null,
  className: null,
};

export default AsSeenOn;
