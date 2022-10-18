import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import * as Styles from './sign-in.module.scss';
import ColorBar from '../components/color-bar';
import { useAuth } from '../contexts/AuthContext';
import RequireAnonymous from '../components/require-anonymous';
import Button from '../components/button';
import GenericPageTitle from '../components/generic-page-title';
import FormError from '../components/form-error';
import GenericPageAltCta from '../components/generic-page-alt-cta';
import PasswordField from '../components/password-field';
import FormProcessing from '../components/form-processing';
import PageDimensions from '../components/page-dimensions';

function SignIn() {
  const { signIn, isSignedIn, redirectStashURL } = useAuth();
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (isProcessing) {
      return;
    }

    setIsProcessing(true);

    try {
      await signIn(username, password);
      setError('');
    } catch (catchError) {
      setError(catchError.message);
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      setIsProcessing(false);
      redirectStashURL();
    }
  }, [isSignedIn]);

  const pageDimensions = {
    contentType: 'sign-in',
  };

  return (
    <div className={Styles.root}>
      <RequireAnonymous>
        <PageDimensions dimensions={pageDimensions} />
      </RequireAnonymous>
      <ColorBar />
      <GenericPageAltCta>
        Don&apos;t have an account?{' '}
        <Link as={Link} to="/sign-up">
          Sign up now!
        </Link>
      </GenericPageAltCta>
      <div className={classNames('container', 'container-hpad-md')}>
        <GenericPageTitle>Sign into your account</GenericPageTitle>
        <FormError message={error} />
        <form onSubmit={handleSubmit} className={classNames('container', 'container-xs')}>
          <div className={classNames('form-group')}>
            <label htmlFor="username" className={classNames('form-label')}>
              Username
              <Link as={Link} to="/forgot-password">
                <small>Forgot Username?</small>
              </Link>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={classNames('form-control')}
              />
            </label>
          </div>
          <div className={classNames('form-group')}>
            {/* Ignorning label linting error since label is referencing field in component */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="password" className={classNames('form-label')}>
              Password
              <Link as={Link} to="/forgot-password">
                <small>Forgot Password?</small>
              </Link>
              <PasswordField
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                visible={passwordVisible}
                onToggleVisible={() => setPasswordVisible(!passwordVisible)}
              />
            </label>
          </div>
          <div className={classNames('form-actions')}>
            <FormProcessing isProcessing={isProcessing}>
              <Button size="md" type="submit" theme="blue" width="md">
                Sign In
              </Button>
            </FormProcessing>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
