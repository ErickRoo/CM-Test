// Auth context stores date in Firebase Auth and profile in Firebase Firestore

import React, { useContext, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { doc, setDoc, onSnapshot, updateDoc, Timestamp } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { auth, db, functions, profileDatabaseName } from '../firebase';
import { useSite } from './SiteContext';
import { getDefaultSkills } from '../utils/skill';
// eslint-disable-next-line import/no-cycle
import {
  getActiveBadgeById,
  getBadgesByTrigger,
  isBadgeComplete,
  isBadgeLevelCompleted,
  mergeBadgeState,
} from '../utils/badges';
import { trackEvent } from '../utils/track';

const allowedRoles = ['student', 'parent', 'teacher'];

/**
 * Create Auth Context
 *
 * @type {React.Context<unknown>}
 */
const AuthContext = React.createContext();

/**
 * Export Auth context for implementation
 *
 * @returns {Object}
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Default profile structure. Used when user is created or if user is anonymous.
 * @type {
 * {
 *  badges: Array.<Object>, Array of badge progress and completion information
 *  skills: Object, Skills explorer results
 *  takenQuestionnaire: Boolean, If user has been SHOWN (not necessarily TAKEN) the questionnare
 *  birthYear: null|Number, User birth year
 *  completedSkills: Boolean,
 *  watchedIntro: Boolean,
 *  avatar: String,
 *  username: String,
 *  consumedContent: *[]
 *  }
 * }
 */
const defaultProfile = {
  avatar: null,
  username: null,
  watchedIntro: false,
  takenQuestionnaire: false,
  completedSkills: false,
  birthYear: null,
  consumedContent: [],
  favoriteContent: [],
  badges: [],
  skills: getDefaultSkills(),
};

/**
 * Convert Firebase psuedo email address to username
 *
 * @param {string} email
 * @returns {string}
 */
export function emailToUsername(email) {
  return email.substring(2).replace(/@timeforkids\.com$/, '');
}

/**
 * Convert username to Firebase psuedo email address
 *
 * @param {string} username
 * @returns {string}
 */
export function usernameToEmail(username) {
  return `__${username}@timeforkids.com`;
}

export function AuthProvider({ children }) {
  /**
   * @type {[Object, Function]} Firebase Auth user object
   */
  const [user, setUser] = useState(null);

  /**
   * @type {[Boolean, Function]} Is Auth state resolved. Does not indicate user is logged in; only if resolved.
   */
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * @type {[Object, Function]} profile object
   */
  const [profile, setProfile] = useState(defaultProfile);

  /**
   * @type {Function} add alert
   */
  const { addAlert, pathPrefix } = useSite();

  /**
   * Escape string for regex
   *
   * @param string
   * @returns {string}
   */
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  /**
   * @type {[Object, Function]} stashed URL to redirect to on log in / sign up
   */
  const { stashURL, setStashURL } = useSite();

  /**
   * Validate user-submitted email address via server-side cloud function
   *
   * @param {string} email
   * @returns {Promise<void>}
   */
  async function validateEmail(email) {
    await httpsCallable(functions, 'validateEmail')({ email });
  }

  /**
   * Create user account in Firebase auth
   *
   * @param {string} username
   * @param {string} password
   * @param {string} email
   * @param {string} avatar
   * @param {number} age
   * @param {boolean} newsletter
   * @param {boolean} marketing
   * @returns {Promise<void>}
   */
  async function signUp(username, password, email, avatar, age, newsletter, marketing) {
    await validateEmail(email);
    await createUserWithEmailAndPassword(auth, usernameToEmail(username), password);

    // New user, we can safely create profile without fear of overwriting existing profile
    const ref = doc(db, profileDatabaseName, auth.currentUser.uid);

    // Create estimated birth date
    const birthYear = new Date();
    birthYear.setYear(birthYear.getFullYear() - age);

    setDoc(ref, {
      birthYear: Timestamp.fromDate(birthYear),
      avatar,
      username,
      createdAt: Timestamp.now(),
      ...(age < 18 && { roles: ['student'] }),
    });

    // send uid cookie with newsletter/marketing preferences
    const newsletterOptIn = newsletter ? 'newsletter' : '';
    const marketingOptIn = marketing ? 'marketing' : '';

    try {
      await httpsCallable(functions, 'setEmail')({ email });
    } catch (e) {
      // Error silently
    }

    let uid;
    if (window.jstag) {
      // eslint-disable-next-line no-undef
      uid = window.jstag.ckieGet('seerid');
    }

    if (uid) {
      try {
        if (newsletter || marketing) {
          await httpsCallable(functions, 'setOptIns')({ email, newsletterOptIn, marketingOptIn, uid });
        }
      } catch (e) {
        // Error silently
      }
    }

    getBadgesByTrigger('action', 'createProfile').forEach((badge) => {
      // eslint-disable-next-line no-use-before-define
      addBadgeProgress(badge.id, 'profile');
    });
  }

  /**
   * Log in user with Firebase auth
   *
   * @param {string} username
   * @param {string} password
   * @returns {Promise<void>}
   */
  async function signIn(username, password) {
    await signInWithEmailAndPassword(auth, usernameToEmail(username), password);
  }

  /**
   * Log out user with Firebase auth
   *
   * @returns {Promise<*>}
   */
  async function signOut() {
    return firebaseSignOut(auth);
  }

  /**
   * Set password with Firebase auth
   *
   * @param {string} password
   * @returns {Promise<*>}
   */
  async function setPassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  /**
   * Reauthenticate uuser with Firebase auth
   * In some circumstances (e.g. changing password), current user may be required to reauthenticate.
   * Typical scenario is if the user has been logged in a for an extended amount of time.
   *
   * @param {string} password
   * @returns {Promise<*>}
   */
  async function reauthenticate(password) {
    const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
    return reauthenticateWithCredential(auth.currentUser, credential);
  }

  /**
   * Set user email via server-side cloud function
   *
   * @param {string} email
   * @returns {Promise<void>}
   */
  async function setEmail(email) {
    await validateEmail(email);
    await httpsCallable(functions, 'setEmail')({ email });
  }

  /**
   * Redirect to stash URL if exist or go home
   *
   * @param defaultUrl
   */
  function redirectStashURL(defaultUrl = '/') {
    const re = new RegExp(`^${escapeRegExp(pathPrefix)}`);

    if (stashURL) {
      const localStashURL = stashURL;
      setStashURL(null);
      navigate(localStashURL.replace(re, ''));
    } else {
      navigate(defaultUrl.replace(re, ''));
    }
  }

  /**
   * Send magic sign in link to user to recover lost account via server-side cloud function
   *
   * @param {string} email
   * @returns {Promise<void>}
   */
  async function sendLink(email) {
    await httpsCallable(functions, 'recoverAccount')({ email });
  }

  /**
   * Log in user via magic link to recover lost account
   *
   * @returns {Promise<void>}
   */
  async function acceptLink(username) {
    const authObj = getAuth();

    if (isSignInWithEmailLink(authObj, window.location.href)) {
      await signInWithEmailLink(authObj, usernameToEmail(username), window.location.href);
    } else {
      throw new Error('An error occurred while resetting the password. Please try again.');
    }
  }

  /**
   * Update profile stored in Firebase Firestore
   *
   * @param {Object} data
   */
  function updateProfile(data) {
    updateDoc(doc(db, profileDatabaseName, auth.currentUser.uid), {
      ...data,
      ...{ updatedAt: Timestamp.now() },
    });
  }

  /**
   * Set avatar
   * @param {String} avatar
   */
  function setAvatar(avatar) {
    updateProfile({ avatar });
  }

  /**
   * Set watched intro
   * @param {Boolean} watchedIntro
   */
  function setWatchedIntro(watchedIntro) {
    updateProfile({ watchedIntro });
  }

  /**
   * Set taken questionnaire
   * @param {Boolean} takenQuestionnaire
   */
  function setTakenQuestionnaire(takenQuestionnaire) {
    updateProfile({ takenQuestionnaire });
  }

  /**
   * Set completed skills, indicating the user has completed skills explorer
   * @param {Boolean} completedSkills
   */
  function setCompletedSkills(completedSkills) {
    updateProfile({ completedSkills });
  }

  /**
   * Set consumed content
   * @param {String} id
   */
  function setConsumedContent(id) {
    if (profile.consumedContent.indexOf(id) === -1) {
      updateProfile({ consumedContent: [...profile.consumedContent, id] });
    }
  }

  /**
   * Set favorite content
   * @param {String} id
   * @param {Boolean} false
   */
  function setFavoriteContent(id, add = false) {
    if (!Object.prototype.hasOwnProperty.call(profile, 'favoriteContent')) return;
    let favoriteContent = [...profile.favoriteContent];

    if (add && !favoriteContent.includes(id)) {
      favoriteContent.push(id);
    } else if (!add) {
      favoriteContent = favoriteContent.filter((oneId) => oneId !== id);
    }

    updateProfile({ favoriteContent });
  }

  /**
   * Set skills
   * @param {Object} payload
   */
  function setSkills(payload) {
    const skills = { ...getDefaultSkills(), ...profile.skills };

    Object.keys(payload).forEach((k) => {
      if (
        skills[k] instanceof Object &&
        payload[k] instanceof Object &&
        payload[k].value >= 0 &&
        payload[k].value <= 30
      ) {
        skills[k].value = payload[k].value;
      }
    });

    updateProfile({ skills });
  }

  /**
   * Set badge level completed
   * User has completed a specific level within a badge
   * @param {Number} badgeId
   * @param {String} levelId
   */
  function setBadgeLevelCompleted(badgeId, levelId) {
    const badgeState = profile.badges.find(({ id }) => id === badgeId);

    // Create badge levels if it doesn't exist
    if (!badgeState.levels) {
      badgeState.levels = [];
    }

    let level = badgeState.levels.find(({ id }) => id === levelId);

    // If level does not exist, create it
    if (!level) {
      badgeState.levels.push({ id: levelId });
      level = badgeState.levels[badgeState.levels.length - 1];
    }

    // Add completed to level
    level.completed = Timestamp.now();
  }

  /**
   * Set badge completed
   * User has completed the badge, and all levels within
   * @param {Number} badgeId
   */
  function setBadgeCompleted(badgeId) {
    const badgeState = profile.badges.find(({ id }) => id === badgeId);

    badgeState.completed = Timestamp.now();
  }

  /**
   * Compute completion status of badge levels
   * @param {Number} badgeId
   */
  function computeBadgeLevelsCompleted(badgeId) {
    const badge = mergeBadgeState(
      getActiveBadgeById(badgeId),
      profile.badges.find((b) => b.id === badgeId)
    );

    // Skip if badge is already complete
    if (badge.completed) {
      return;
    }

    // Determine if the levels are complete
    badge.levels.forEach((level) => {
      if (!level.completed && isBadgeLevelCompleted(badge, level)) {
        trackEvent('Skills Explorer', 'Digital badge earned by user', `${badge.name} ${level.id}`);
        setBadgeLevelCompleted(badgeId, level.id);
        addAlert({ id: badgeId, level: level.id });
      }
    });
  }

  /**
   * Compute completion status of badge
   * @param {Number} badgeId
   */
  function computeBadgeCompleted(badgeId) {
    const badge = mergeBadgeState(
      getActiveBadgeById(badgeId),
      profile.badges.find((b) => b.id === badgeId)
    );

    // Skip if badge is already complete
    if (badge.completed) {
      return;
    }

    // Determine if all levels are complete
    if (isBadgeComplete(badge)) {
      setBadgeCompleted(badge.id);
    }
  }

  /**
   * Add progress to badge
   * @param {Number} badgeId
   * @param {String} progressId
   * @param defer
   */
  function addBadgeProgress(badgeId, progressId, defer = false) {
    const badge = getActiveBadgeById(badgeId);
    const badgeState = profile.badges.find(({ id }) => id === badgeId);
    const progress = badgeState && badgeState.progress ? badgeState.progress : [];

    // Skip if badge does not exist
    if (!badge) {
      return;
    }

    // Skip if progress is duplicated on badge
    if (progress.indexOf(progressId) !== -1) {
      return;
    }

    // Skip if badge is already completed
    if (badgeState && badgeState.completed) {
      return;
    }

    // Enforce allowedProgress if applicable
    if (badge.allowedProgress && badge.allowedProgress.indexOf(progressId) < 0) {
      return;
    }

    // Add payload progress to progress array
    progress.push(progressId);

    // If badge does not exist in state, push object
    if (!badgeState) {
      profile.badges.push({ id: badgeId, progress });
    }

    // Calculate completion
    computeBadgeLevelsCompleted(badgeId);
    computeBadgeCompleted(badgeId);

    if (!defer) {
      updateProfile({ badges: profile.badges });
    }
  }

  /**
   * Add quick tip to display
   * Will be either skills-explorer or badge quick tip
   * @returns {undefined}
   */
  function addQuickTipAlert() {
    const level = 'quick-tip';

    if (isLoaded && !profile.completedSkills) {
      addAlert({ id: 'skills-explorer', level });
    } else if (isLoaded && !profile.avatar && !profile.user.username) {
      addAlert({ id: 'profile', level });
    }

    return undefined;
  }

  /**
   * Update user account in Firestore db with demographic info
   *
   * @param {string} zipcode
   * @param {string} school
   * @param {string|number} grade
   * @param {array} roles
   * @returns {Promise<void>}
   */
  async function signUpDemographics(zipcode, school, grade, roles = []) {
    const data = {};

    if (zipcode && zipcode.match(/[0-9]{5}/) !== null && zipcode.length === 5) {
      data.zipcode = zipcode;
    }

    if (school) {
      data.school = school;
    }

    if (grade) {
      data.grade = grade;
    }

    if (roles && roles.length) {
      data.roles = roles.filter((role) => {
        return allowedRoles.indexOf(role) >= 0;
      });
    }

    if (Object.keys(data).length > 0) {
      updateProfile(data);
    }
  }

  /**
   * Create Firebase auth event handler to listen for changes in authentication state
   */
  useEffect(() => {
    const authEventHandler = onAuthStateChanged(auth, (eventUser) => {
      if (eventUser) {
        setUser(eventUser);
      } else {
        setUser(null);
        setIsLoaded(true);
      }
    });

    return authEventHandler;
  }, []);

  /**
   * Create Firebase Firestore event handler to listen for changes in profile state
   */
  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, profileDatabaseName, user.uid), (row) => {
        const data = row.data();

        if (data) {
          setProfile({ ...defaultProfile, ...data });
        } else {
          setProfile(defaultProfile);
        }

        setIsLoaded(true);
      });

      return unsub;
    }

    setProfile(defaultProfile);
    return () => {};
  }, [user]);

  /**
   * Create object to pass via context
   *
   * @returns {Object}
   */
  const value = useMemo(
    () => ({
      isLoaded,
      isSignedIn: user && profile.username && isLoaded,
      user,
      profile,
      stashURL,
      signUp,
      signUpDemographics,
      signIn,
      signOut,
      setPassword,
      reauthenticate,
      sendLink,
      acceptLink,
      setEmail,
      setAvatar,
      setWatchedIntro,
      setTakenQuestionnaire,
      setCompletedSkills,
      setConsumedContent,
      setFavoriteContent,
      setSkills,
      addBadgeProgress,
      addQuickTipAlert,
      redirectStashURL,
      setStashURL,
    }),
    [isLoaded, user, profile, stashURL]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
