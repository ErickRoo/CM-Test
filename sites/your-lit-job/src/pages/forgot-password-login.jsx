import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { navigate } from 'gatsby';
import ColorBar from '../components/color-bar';
import { useAuth } from '../contexts/AuthContext';
import GenericPageTitle from '../components/generic-page-title';
import GenericPageCopy from '../components/generic-page-copy';
import FormError from '../components/form-error';
import FormProcessing from '../components/form-processing';
import Button from '../components/button';
import IsAnonymous from '../components/is-anonymous';
import IsUser from '../components/is-user';
import PageDimensions from '../components/page-dimensions';

function ForgotPasswordLogin() {
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [username, setUsername] = useState('');
  const { acceptLink, isSignedIn } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('username') && username === '') {
      setUsername(params.get('username'));
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username) {
      setError('Username is required');
      return;
    }

    setError('');
    setIsProcessing(true);

    try {
      await acceptLink(username);
    } catch (catchError) {
      setError(catchError.message);
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    if (isSignedIn && isProcessing) {
      navigate('/settings/password?reset=true');
    }
  }, [isSignedIn, isProcessing]);

  const pageDimensions = {
    contentType: 'forgot-password',
  };

  return (
    <div>
      <PageDimensions dimensions={pageDimensions} />
      <ColorBar />
      <div className={classNames('container', 'container-hpad-md')}>
        <GenericPageTitle>Forgot your password</GenericPageTitle>
        <GenericPageCopy>
          <p>Enter the username you used when you created your account.</p>
        </GenericPageCopy>
        <IsUser>
          <p style={{ textAlign: 'center' }}>Please logout to reset another account.</p>
        </IsUser>
        <IsAnonymous>
          <FormError message={error} />
          <form onSubmit={handleSubmit} className={classNames('container', 'container-xs')}>
            <div className={classNames('form-group')}>
              <label htmlFor="username" className={classNames('form-label')}>
                Username
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
            <div className={classNames('form-actions')}>
              <FormProcessing isProcessing={isProcessing}>
                <Button type="submit" theme="blue" size="md" width="md">
                  Submit
                </Button>
              </FormProcessing>
            </div>
          </form>
        </IsAnonymous>
      </div>
    </div>
  );
}

export default ForgotPasswordLogin;
