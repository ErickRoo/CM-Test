import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';
import { getBadgesRelatedToContent } from '../utils/badges';

function AskBadgeProgress({ ask }) {
  const { addBadgeProgress } = useAuth();
  const { isSignedIn } = useAuth();
  const [badgeProgress, setBadgeProgress] = useState(false);

  useEffect(() => {
    if (isSignedIn && !badgeProgress) {
      setBadgeProgress(true);

      // Track content progress by content
      const badgeTimeout = setTimeout(() => {
        getBadgesRelatedToContent(ask).forEach((badge) => {
          addBadgeProgress(badge.id, ask.id);
        });
      }, 60000);

      return () => {
        clearTimeout(badgeTimeout);
      };
    }
    return () => {};
  }, [isSignedIn]);

  return null;
}

AskBadgeProgress.propTypes = {
  ask: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.shape({
      description: PropTypes.string,
    }),
    primaryImage: PropTypes.shape({
      media: PropTypes.shape({
        image: PropTypes.shape({}),
      }),
    }),
    publishDate: PropTypes.string,
    metadata: PropTypes.shape({
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        })
      ),
    }),
    url: PropTypes.string,
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    metaKeywords: PropTypes.string,
    canonicalUrl: PropTypes.string,
  }),
};

AskBadgeProgress.defaultProps = {
  ask: null,
};

export default AskBadgeProgress;
