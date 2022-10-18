import React, { useEffect, useState, useRef } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useScrollYPosition } from 'react-use-scroll-position/index';
import * as Styles from './index.module.scss';
import Post from '../components/post';
import Top from '../components/top';
import MetaTitle from '../components/meta-title';
import MetaDescription from '../components/meta-description';
import MetaKeywords from '../components/meta-keywords';
import MetaImage from '../components/meta-image';
import ModalSkillsExplorerStart from '../components/modal-skills-explorer-start';
import ModalBadgesStart from '../components/modal-earn-badges-start';
import {
  filterNonsortableEntries,
  filterSortableEntries,
  sortEntriesByPriority,
  filterStickyEntries,
  filterNonstickyEntries,
  sortEntriesBySticky,
  injectEntriesByNth,
  requireOne,
  sortByPublishDate,
} from '../utils/entries';
import { isPlaceholder } from '../utils/placeholder';
import { findTagIdBySkill, getSkillsCacheKey, sortSkills } from '../utils/skill';
import { arrayShuffle } from '../utils/array';
import ColorBar from '../components/color-bar';
import PageDimensions from '../components/page-dimensions';
import ModalVideo from '../components/elements/ModalVideo';
import FavoriteBar from '../components/favorite-bar';
import { useSite } from '../contexts/SiteContext';
import { useAuth } from '../contexts/AuthContext';
import { getUserCompletedBadgesAnyLevel } from '../utils/badges';
import { getPostsBasedOnFavoriteFilter } from '../utils/posts-filtered';

function Index({ data }) {
  const { isLoaded, profile, addQuickTipAlert, isSignedIn } = useAuth();
  const [explorerModal, setExplorerModal] = useState(false);
  const [badgeModal, setBadgeModal] = useState(false);
  // eslint-disable-next-line no-use-before-define
  const [posts, setPosts] = useState(defaultFeed());
  const [isFeedLoaded, setIsFeedLoaded] = useState(false);
  const scrollY = useScrollYPosition();
  const [watchedIntro, setWatchedIntro] = useState(false);
  const [showModalVideo, setShowModalVideo] = useState(false);
  const modalRef = useRef(false);
  const {
    back,
    indexScrollPosition,
    setIndexScrollPosition,
    indexFeedCache,
    setIndexFeedCache,
    indexFeedCacheKey,
    setIndexFeedCacheKey,
    showExplorerModal,
    setShowExplorerModal,
    showBadgeModal,
    setShowBadgeModal,
    favoriteFilter,
  } = useSite();

  const pageDimensions = {
    contentType: 'Feed',
  };

  // Show skills explorer modal
  // Only want this value displayed on load, not intended to be reactive
  useEffect(() => {
    if (isLoaded && showExplorerModal && !profile.completedSkills) {
      setExplorerModal(true);
      modalRef.current = true;
      setShowExplorerModal(false);
    }
  }, [isLoaded]);

  // Show badges modal
  // Only want this value displayed on load, not intended to be reactive
  useEffect(() => {
    if (isLoaded && showBadgeModal && profile.completedSkills) {
      const completedBadges = getUserCompletedBadgesAnyLevel(profile.badges);

      if (completedBadges.length < 3) {
        setBadgeModal(true);
        modalRef.current = true;
        setShowBadgeModal(false);
      }
    }
  }, [isLoaded]);

  // Set watched intro when profile is loaded
  // Only want this value displayed on load, not intended to be reactive
  useEffect(() => {
    if (isLoaded) {
      setWatchedIntro(profile.watchedIntro);
    }
  }, [isLoaded]);

  /**
   * Intro video post
   * @returns {Object}
   */
  function introVideoPost() {
    return {
      id: 'intro-video',
      internal: {
        type: 'ContentfulPost',
      },
      title: 'This Is Your 🔥 Job',
      description: {
        description:
          'Find your future. What do you want to be? You don’t have to decide just yet—there’s an entire world of career options waiting for you.',
      },
      video: {
        videoId: 'oy8dLaiY',
      },
      metadata: {
        tags: [],
      },
    };
  }

  /**
   * Default feed rendered on the server
   * @returns {Array.<Object>}
   */
  function defaultFeed() {
    const allPosts = data.posts.nodes.filter((node) => {
      return requireOne(node, ['videos', 'primaryImage']) && !isPlaceholder(node);
    });

    // Build feed
    const sticky = sortEntriesBySticky(filterStickyEntries(allPosts));
    const nonsticky = filterNonstickyEntries(allPosts);
    const nonsortable = sortByPublishDate(filterNonsortableEntries(nonsticky));
    const sortable = filterSortableEntries(
      nonsticky.sort((a, b) => {
        const dateA = Date.parse(a.publishDate);
        const dateB = Date.parse(b.publishDate);
        return dateB - dateA;
      })
    );

    return injectEntriesByNth([introVideoPost(), ...sticky, ...sortable], nonsortable, 4).slice(0, 40);
  }

  /**
   * User feed
   * @returns {Array.<Object>}
   */
  function userFeed() {
    const allPosts = data.posts.nodes.filter((node) => {
      return requireOne(node, ['videos', 'primaryIma`ge']) && !isPlaceholder(node);
    });
    const skillsSorted = sortSkills(profile.skills);
    const pointsPerTag = {};

    skillsSorted.forEach((skill) => {
      pointsPerTag[findTagIdBySkill(skill.id)] = skill.value;
    });

    const sticky = sortEntriesBySticky(filterStickyEntries(allPosts));
    const nonsticky = filterNonstickyEntries(allPosts);
    const nonsortable = filterNonsortableEntries(nonsticky);
    const sortable = filterSortableEntries(
      sortEntriesByPriority(nonsticky, 'date', (entry) => {
        let { points } = entry;
        const date = Date.parse(entry.eventDate ? entry.eventDate : entry.publishDate);

        // Give points for matching skill tags
        if (entry.metadata && entry.metadata.tags) {
          entry.metadata.tags.forEach((tag) => {
            // Skill points multiplied by 2 to allow more allowance for other point factors to break ties
            points += pointsPerTag[tag.contentful_id] ? pointsPerTag[tag.contentful_id] * 2 : 0;
          });
        }

        // Give points for proximity to publish date
        if (date) {
          const weekInSeconds = 604800;
          const timeDiff = Math.round(Math.abs(date - Date.now()) / 1000 / weekInSeconds);

          if (timeDiff > 0 && timeDiff < 4) {
            points += Math.abs(timeDiff - 5);
          }
        }

        return points;
      })
    );

    return injectEntriesByNth([...sticky, ...sortable], arrayShuffle(nonsortable), 4).slice(0, 40);
  }

  // Generate feed
  useEffect(() => {
    // Due to video player issues, we only want the feed rendered once.
    // This isn't a reactive issue since the skills cannot change on the index page anyway
    if (!isFeedLoaded && isLoaded) {
      let feed = [];

      if (isSignedIn) {
        const skillsSorted = sortSkills(profile.skills);
        const newIndexFeedCacheKey = getSkillsCacheKey(skillsSorted);

        if (indexFeedCache.length && indexFeedCacheKey === newIndexFeedCacheKey) {
          feed = indexFeedCache
            .map((id) => {
              return data.posts.nodes.find((post) => {
                return post.id === id;
              });
            })
            .filter(Boolean);
        } else {
          feed = userFeed();

          setPosts(feed);
          setIndexFeedCacheKey(newIndexFeedCacheKey);
          setIndexFeedCache(feed.map((post) => post.id));
        }

        if (!profile.watchedIntro) {
          feed.unshift(introVideoPost());
        }
      } else {
        feed = defaultFeed();
      }

      setPosts(feed);

      // Handle scroll position on dynamically generated post list
      if (back) {
        window.requestAnimationFrame(() => {
          setTimeout(() => {
            // Unfortunate hack, but resolves issue with scrolling to incorrect position
            window.scrollTo(0, indexScrollPosition);
          }, 1);
        });
      }

      setIsFeedLoaded(true);
    }
  }, [isLoaded, isSignedIn]);

  // Handle scroll position on dynamically generated post list
  useEffect(() => {
    setIndexScrollPosition(window.scrollY);
  }, [scrollY]);

  // Handle show Quick tips alerts
  useEffect(() => {
    setTimeout(() => {
      const showQuickTip = !modalRef.current;
      if (showQuickTip) setTimeout(() => addQuickTipAlert(), 2000);
    }, 2000);
  }, []);

  const postsFiltered = getPostsBasedOnFavoriteFilter(posts, data.posts, isSignedIn && favoriteFilter, profile);
  return (
    <div className={Styles.root}>
      <PageDimensions dimensions={pageDimensions} />
      <MetaTitle prefix="Your 🔥 Job | " title="Help Your Teen Find Their Future Career" suffix={false} />
      <MetaDescription description="A world of career options awaits. Your Hot Job empowers kids ages 8 to 14 to find their future on a path that's just right for them." />
      <MetaKeywords keywords="future career, future job, middle school jobs, middle school careers, stem careers for students, stem careers, high school career website, career counseling for teens, career counseling for young adults, career development resources for students, careers climate change, career day ideas, space jobs for students" />
      <MetaImage />
      <div className={Styles.header}>
        {watchedIntro && (
          <button
            type="button"
            onClick={() => {
              setShowModalVideo(true);
            }}
            className={Styles.headerPlay}
          >
            Play Intro Video
          </button>
        )}
      </div>
      <ColorBar />
      <FavoriteBar />
      <div className={classNames(Styles.posts, isFeedLoaded && Styles.loaded, 'container')}>
        {postsFiltered.map((post) => {
          return (
            <section className={Styles.post} key={post.id}>
              <Post hit={post} headingLevel={2} ssr={!isFeedLoaded} />
            </section>
          );
        })}
      </div>
      <Top show className={Styles.top} />
      <ModalSkillsExplorerStart
        open={explorerModal}
        showClose
        close={() => {
          modalRef.current = false;
          setExplorerModal(false);
        }}
      />
      <ModalBadgesStart
        open={badgeModal}
        showClose
        close={() => {
          modalRef.current = false;
          setBadgeModal(false);
        }}
      />
      <ModalVideo open={showModalVideo} close={() => setShowModalVideo(false)} />
    </div>
  );
}

Index.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
};

export const query = graphql`
  query {
    posts: allContentfulEntry(
      filter: {
        internal: {
          type: {
            in: ["ContentfulArticle", "ContentfulMultimedia", "ContentfulAsk", "ContentfulMeetup", "ContentfulPost"]
          }
        }
      }
    ) {
      nodes {
        ...PostAskFields
        ...PostMeetupFields
        ...PostPostFields
        ...PostArticleFields
        ...PostMultimediaFields
      }
    }
  }
`;

export default Index;
