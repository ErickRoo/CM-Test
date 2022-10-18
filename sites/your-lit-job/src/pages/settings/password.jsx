import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import classNames from 'classnames';
import { useAuth } from '../../contexts/AuthContext';
import RequireUser from '../../components/require-user';
import Button from '../../components/button';
import * as Styles from './password.module.scss';
import ColorBar from '../../components/color-bar';
import GenericPageTitle from '../../components/generic-page-title';
import GenericPageCopy from '../../components/generic-page-copy';
import FormError from '../../components/form-error';
import PasswordField from '../../components/password-field';
import FormProcessing from '../../components/form-processing';
import PageDimensions from '../../components/page-dimensions';

const requireRecentLoginErrorCode = 'auth/requires-recent-login';

function Password() {
  const { setPassword: authSetPassword, reauthenticate } = useAuth();
  const [reauth, setReauth] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('reset')) {
      setIsReset(true);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (isProcessing) {
      return;
    }
    setIsProcessing(true);

    if (reauth) {
      try {
        await reauthenticate(password);
        setReauth(false);
      } catch (catchError) {
        setError(catchError.message);
        return;
      }
    }

    try {
      if (newPassword !== newPasswordConfirmation) {
        throw new Error('Passwords do not match');
      }

      await authSetPassword(newPassword);
      setError('');

      if (isReset) {
        navigate('/');
      } else {
        navigate('/profile');
      }
    } catch (catchError) {
      if (catchError.code === requireRecentLoginErrorCode) {
        setReauth(true);
        setError('Please enter your current password to update your password.');
      } else {
        setError(catchError.message);
      }
    }

    setIsProcessing(false);
  }

  const pageDimensions = {
    contentType: 'settings',
  };

  return (
    <div className={Styles.root}>
      <RequireUser to="/sign-in">
        <PageDimensions dimensions={pageDimensions} />
      </RequireUser>
      <ColorBar />
      <div className={classNames('container', 'container-hpad-md')}>
        <GenericPageTitle>Update your password</GenericPageTitle>
        {isReset && (
          <GenericPageCopy>
            <p>Enter a new password below to reset your account.</p>
          </GenericPageCopy>
        )}
        <FormError message={error} />
        <form onSubmit={handleSubmit} className={classNames('container', 'container-xs')}>
          {reauth && (
            <div className={classNames('form-group')}>
              {/* Ignorning label linting error since label is referencing field in component */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="password" className={classNames('form-label')}>
                Current Password
                <PasswordField
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  visible={passwordVisible}
                  onToggleVisible={() => setPasswordVisible(!passwordVisible)}
                />
              </label>
            </div>
          )}
          <div className={classNames('form-group')}>
            {/* Ignorning label linting error since label is referencing field in component */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="new-password" className={classNames('form-label')}>
              New Password <small>(Must be at least 6 characters)</small>
              <PasswordField
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                visible={newPasswordVisible}
                onToggleVisible={() => setNewPasswordVisible(!newPasswordVisible)}
              />
            </label>
          </div>
          <div className={classNames('form-group')}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="password-confirmation" className={classNames('form-label')}>
              Confirm New Password
              <PasswordField
                id="password-confirmation"
                value={newPasswordConfirmation}
                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                visible={newPasswordVisible}
                onToggleVisible={() => setNewPasswordVisible(!newPasswordVisible)}
              />
            </label>
          </div>
          <div className={classNames('form-actions')}>
            <FormProcessing isProcessing={isProcessing}>
              <Button type="submit" theme="blue" width="md" size="md">
                Submit
              </Button>
            </FormProcessing>
          </div>
        </form>
        {!isReset && (
          <Link to="/settings" className={Styles.link}>
            Back to Account Settings
          </Link>
        )}
      </div>
    </div>
  );
}

export default Password;
