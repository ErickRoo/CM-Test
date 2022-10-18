import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';
import { getBadgesRelatedToContent } from '../utils/badges';

function ArticleBadgeProgress({ article }) {
  const { addBadgeProgress, setConsumedContent } = useAuth();
  const { isSignedIn } = useAuth();
  const [badgeProgress, setBadgeProgress] = useState(false);

  useEffect(() => {
    if (isSignedIn && !badgeProgress) {
      setBadgeProgress(true);

      // Track custom badge progress defined by article
      if (article.badgeProgress) {
        article.badgeProgress.forEach(({ badge, progress }) => {
          if (badge && progress) {
            addBadgeProgress(badge, progress);
          }
        });
      }

      // Track content progress by content
      const badges = getBadgesRelatedToContent(article);

      badges.forEach((badge) => {
        addBadgeProgress(badge.id, article.id);
      });

      // Track content consumed
      setConsumedContent(article.id);
    }
  }, [isSignedIn]);

  return null;
}

ArticleBadgeProgress.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.shape({}),
    publishDate: PropTypes.string,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    description: PropTypes.shape({
      description: PropTypes.string,
    }),
    videos: PropTypes.arrayOf(PropTypes.shape({})),
    videosPosition: PropTypes.string,
    deck: PropTypes.string,
    asSeenOn: PropTypes.string,
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    metaKeywords: PropTypes.string,
    canonicalUrl: PropTypes.string,
    primaryImage: PropTypes.shape({
      description: PropTypes.string,
      alt: PropTypes.string,
      source: PropTypes.string,
      media: PropTypes.shape({
        image: PropTypes.shape({}),
      }),
    }),
    metadata: PropTypes.shape({
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        })
      ),
    }),
    badgeProgress: PropTypes.arrayOf(PropTypes.shape({ badge: PropTypes.number, progress: PropTypes.string })),
  }),
  moreArticles: PropTypes.shape({
    nodes: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

ArticleBadgeProgress.defaultProps = {
  article: null,
  moreArticles: null,
};

export default ArticleBadgeProgress;
