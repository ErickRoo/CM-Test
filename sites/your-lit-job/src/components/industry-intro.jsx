import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './industry-intro.module.scss';

import IndustryRichText from './industry-rich-text';

function IndustryIntro({ industry }) {
  if (!industry.deck && !industry.body) {
    return null;
  }
  return (
    <div className={classNames(Styles.intro, 'container container-md')}>
      {industry.deck && (
        <div className={Styles.deck} style={{ color: industry.foregroundColor }}>
          {industry.deck}
        </div>
      )}
      {industry.body && <IndustryRichText body={industry.body} className={Styles.body} />}
      {industry.description && <div className={Styles.description}>{industry.description}</div>}
      {industry.comingSoon && (
        <div className={Styles.comingSoon} style={{ color: industry.foregroundColor }}>
          Coming soon. Watch this spot!
        </div>
      )}
    </div>
  );
}

IndustryIntro.propTypes = {
  industry: PropTypes.shape({
    deck: PropTypes.string,
    body: PropTypes.shape({
      raw: PropTypes.string,
    }),
    description: PropTypes.string,
    video: PropTypes.shape({
      videoId: PropTypes.string,
    }),
    foregroundColor: PropTypes.string,
    comingSoon: PropTypes.bool,
    canonicalUrl: PropTypes.string,
  }).isRequired,
};

export default IndustryIntro;
