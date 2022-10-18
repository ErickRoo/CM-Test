// Site context stores data for the session (cleared on refresh)

import React, { useContext, useMemo, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

/**
 * Create Site Context
 *
 * @type {React.Context<unknown>}
 */
const SiteContext = React.createContext();

export function useSite() {
  return useContext(SiteContext);
}

export function SiteProvider({ children }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        pathPrefix
      }
    }
  `);

  /**
   * @type {[String, Function]} Stashed URL for authentication redirection.
   * When a user visits a page requiring authentication and needs to be redirected back after log in or sign up.
   */
  const [stashURL, setStashURL] = useState(null);

  /**
   * @type {[Object, Function]} Determine if page, on initial render, is the result of a user going back.
   * Specifically used on index page, where the feed is dynamically generated and scroll position must be manually retained.
   */
  const [back, setBack] = useState(false);

  /**
   * @type {[Number, Function]} Saved scroll position on index page.
   * The feed is dynamically generated and scroll position must be manually retained.
   */
  const [indexScrollPosition, setIndexScrollPosition] = useState(0);

  /**
   * @type {[Array, Function]} Cached version of homepage feed.
   * If the user returns to the homepage within the same page load, the feed should not change.
   */
  const [indexFeedCache, setIndexFeedCache] = useState([]);

  /**
   * @type {[String, Function]} Cached key of homepage feed.
   * Creates key, related to users skills, associated with feed cache. If skills change, key will not match and a new
   * cache will be built.
   */
  const [indexFeedCacheKey, setIndexFeedCacheKey] = useState(null);

  /**
   * @type {[Boolean, Function]} Cached favorite filter pressed state.
   */
  const [favoriteFilter, setFavoriteFilter] = useState(null);

  /**
   * @type {[Boolean, Function]} Potentially allow show explorer modal to be displayed
   * After explorer modal is shown, it is set to false to prevent repeatedly showing the modal during a session
   */
  const [showExplorerModal, setShowExplorerModal] = useState(true);

  /**
   * @type {[Boolean, Function]} Potentially allow show badge modal to be displayed
   * After badge modal is shown, it is set to false to prevent repeatedly showing the modal during a session
   */
  const [showBadgeModal, setShowBadgeModal] = useState(true);

  /**
   * @type {[Array, Function]} Queue of alerts to display
   */
  const [alerts, setAlerts] = useState([]);

  /**
   * Add alert
   *
   * @param {Object} alert
   */
  function addAlert(alert) {
    setAlerts([alert, ...alerts]);
  }

  /**
   * Pop (remove) next alert in line
   *
   * @returns {undefined|Object}
   */
  function popAlert() {
    const alert = alerts[alerts.length - 1];

    if (alert) {
      const newAlerts = [...[], ...alerts];
      newAlerts.pop();
      setAlerts(newAlerts);

      return alert;
    }

    return undefined;
  }

  const value = useMemo(() => {
    return {
      stashURL,
      setStashURL,
      back,
      setBack,
      indexScrollPosition,
      setIndexScrollPosition,
      indexFeedCache,
      setIndexFeedCache,
      indexFeedCacheKey,
      setIndexFeedCacheKey,
      favoriteFilter,
      setFavoriteFilter,
      showExplorerModal,
      setShowExplorerModal,
      showBadgeModal,
      setShowBadgeModal,
      alerts,
      popAlert,
      addAlert,
      pathPrefix: data && data.site.pathPrefix ? data.site.pathPrefix : '',
    };
  }, [
    stashURL,
    back,
    indexScrollPosition,
    indexFeedCache,
    indexFeedCacheKey,
    favoriteFilter,
    showExplorerModal,
    showBadgeModal,
    alerts,
    data,
  ]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

SiteProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
