import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import classNames from 'classnames';
import * as Styles from './sign-up.module.scss';
import { useAuth } from '../contexts/AuthContext';
import Avatar, { avatarList } from '../components/avatar';
import ColorBar from '../components/color-bar';
import RequireAnonymous from '../components/require-anonymous';
import bannedWords from '../utils/banned-words.json';
import Button from '../components/button';
import GenericPageTitle from '../components/generic-page-title';
import GenericPageCopy from '../components/generic-page-copy';
import FormError from '../components/form-error';
import GenericPageAltCta from '../components/generic-page-alt-cta';
import PasswordField from '../components/password-field';
import FormProcessing from '../components/form-processing';
import PageDimensions from '../components/page-dimensions';
import { trackEvent } from '../utils/track';

function SignUp() {
  const { signUp, isSignedIn, stashURL } = useAuth();
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [marketing, setMarketing] = useState(true);
  const [isOldEnough, setIsOldEnough] = useState('');
  const [avatarIndex, setAvatarIndex] = React.useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  function isCrude(n) {
    if (n) {
      return (
        bannedWords
          .map((word) => {
            return n.toLowerCase().search(word) === -1;
          })
          .indexOf(false) !== -1
      );
    }
    return false;
  }

  useEffect(() => {
    if (parseInt(age, 10) && parseInt(age, 10) > 13) {
      setIsOldEnough(true);
    } else {
      setIsOldEnough(false);
    }
  }, [age]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (isProcessing) {
      return;
    }
    setSubmit(true);

    if (isCrude(username)) {
      setError('Please try a different name!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (password !== password2) {
      setError('Passwords do not match!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (!(parseInt(age, 10) && parseInt(age, 10) > 0 && parseInt(age, 10) < 100)) {
      setError('Please enter a valid age');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsProcessing(true);

      try {
        await signUp(
          username,
          password,
          email,
          avatarList[avatarIndex],
          parseInt(age, 10),
          isOldEnough ? newsletter : isOldEnough,
          isOldEnough ? marketing : isOldEnough
        );
        setError('');
        setIsProcessing(false);
      } catch (catchError) {
        setError(catchError.message);
        setIsProcessing(false);
      }
    }
  }

  // avatar

  function changeAvatar(changeBy) {
    let newValue;

    if (avatarIndex + changeBy === avatarList.length || avatarIndex < 0) {
      newValue = 0;
    } else if (avatarIndex + changeBy < 0) {
      newValue = avatarList.length - 1;
    } else {
      newValue = avatarIndex + changeBy;
    }

    setAvatarIndex(newValue);
  }

  useEffect(() => {
    if (isSignedIn && !isProcessing) {
      trackEvent('Account Creation Success', 'Registration', stashURL);
      navigate('/sign-up-opt');
    }
  }, [isSignedIn, isProcessing]);

  const pageDimensions = {
    contentType: 'sign-up',
  };

  return (
    <div className={Styles.root}>
      {!submit && (
        <RequireAnonymous>
          <PageDimensions dimensions={pageDimensions} />
        </RequireAnonymous>
      )}
      <ColorBar />
      <GenericPageAltCta>
        Already have an account? <Link to="/sign-in">Sign in!</Link>
      </GenericPageAltCta>
      <div className={classNames('container', 'container-hpad-md')}>
        <GenericPageTitle>Create your free account</GenericPageTitle>
        <GenericPageCopy>
          <p>
            With a free account, you&apos;ll be able to take the Skills Explorer quiz and earn badges as you explore
            exciting careers.
          </p>
        </GenericPageCopy>
        <FormError message={error} />

        <form onSubmit={handleSubmit} className={classNames('container', 'container-xs')}>
          <div className={Styles.avatarHelper}>
            <strong>Choose your favorite avatar</strong>
            <br />
            (You can change it from your profile at any time)
          </div>
          <div className={classNames(Styles.avatarSelect, 'form-group')}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              title="previous avatar"
              className={classNames(Styles.selectButton, Styles.selectButtonL)}
              type="button"
              onClick={() => changeAvatar(-1)}
            />
            <Avatar className={Styles.avatar} avatar={avatarList[avatarIndex]} />
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              title="next avatar"
              className={classNames(Styles.selectButton, Styles.selectButtonR)}
              type="button"
              onClick={() => changeAvatar(1)}
            />
          </div>
          <div className={classNames('form-group')}>
            <label htmlFor="username" className={classNames('form-label')}>
              Username
              <small>(Do not use your real name)</small>
              <input
                type="text"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={classNames('form-control')}
              />
            </label>
          </div>
          <div className={classNames('form-group')}>
            <label htmlFor="email" className={classNames('form-label')}>
              Email
              <input
                id="email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classNames('form-control')}
              />
            </label>
          </div>
          <div className={classNames('form-group')}>
            {/* Ignorning label linting error since label is referencing field in component */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="password" className={classNames('form-label')}>
              Password
              <small>(Must be at least 6 characters long)</small>
              <PasswordField
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                visible={passwordVisible}
                onToggleVisible={() => setPasswordVisible(!passwordVisible)}
              />
            </label>
          </div>
          <div className={classNames('form-group')}>
            {/* Ignorning label linting error since label is referencing field in component */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="password-confirm" className={classNames('form-label')}>
              Confirm Password
              <PasswordField
                id="password-confirm"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                visible={passwordVisible}
                onToggleVisible={() => setPasswordVisible(!passwordVisible)}
              />
            </label>
          </div>
          <div className={classNames('form-group')}>
            <label htmlFor="age" className={classNames('form-label')}>
              Age
              <input
                id="age"
                type="number"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1"
                max="99"
                className={classNames('form-control', 'hide-steps')}
              />
            </label>
          </div>
          {isOldEnough && (
            <>
              <div className={classNames('form-check', Styles.newsletter)}>
                <label htmlFor="newsletter" className={classNames('form-check-label')}>
                  <input
                    type="checkbox"
                    id="newsletter"
                    defaultChecked
                    value={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className={classNames('form-check-input')}
                  />
                  <span>
                    Sign up for the Your 🔥 Job newsletter to be the first to hear about new content, product updates, and more.
                  </span>
                </label>
              </div>
              <div className={classNames('form-check', Styles.newsletter)}>
                <label htmlFor="marketing" className={classNames('form-check-label')}>
                  <input
                    type="checkbox"
                    id="marketing"
                    defaultChecked
                    value={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className={classNames('form-check-input')}
                  />
                  <span>Sign up for special promotions from TIME for Kids and related offerings.</span>
                </label>
              </div>
            </>
          )}
          <div className={classNames('form-actions')}>
            <FormProcessing isProcessing={isProcessing}>
              <Button size="md" type="submit" theme="blue" width="md">
                Submit
              </Button>
            </FormProcessing>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
