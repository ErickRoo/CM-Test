import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as Styles from './like.module.scss';
import { trackEvent } from '../utils/track';
import { getBadgesByTrigger } from '../utils/badges';
import { useAuth } from '../contexts/AuthContext';
import IsLoaded from './is-loaded';

function Like({ callToAction, className, contentId }) {
  const [response, setResponse] = useState(null);
  const { addBadgeProgress, isSignedIn } = useAuth();

  const respond = (value) => {
    if (value !== response) {
      setResponse(value);
      if (value === 1) {
        trackEvent('Like content', 'Content Action', 'Like content');
      } else {
        trackEvent('Dislike content', 'Content Action', 'Dislike content');
      }

      // Track progress
      if (isSignedIn && contentId) {
        getBadgesByTrigger('action', 'review').forEach((badge) => {
          addBadgeProgress(badge.id, contentId);
        });
      }
    }
  };

  return (
    <IsLoaded visibility>
      <div className={classNames(Styles.root, className)}>
        {callToAction && <div className={Styles.cta}>{callToAction}</div>}
        <div className={Styles.actions}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className={classNames(Styles.like, { [Styles.active]: response === 1 })}
            title="Like"
            onClick={() => respond(1)}
          />
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className={classNames(Styles.dislike, { [Styles.active]: response === 0 })}
            title="Dislike"
            onClick={() => respond(0)}
          />
        </div>
      </div>
    </IsLoaded>
  );
}

Like.propTypes = {
  callToAction: PropTypes.string,
  className: PropTypes.string,
  contentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Like.defaultProps = {
  callToAction: null,
  className: null,
  contentId: null,
};

export default Like;
