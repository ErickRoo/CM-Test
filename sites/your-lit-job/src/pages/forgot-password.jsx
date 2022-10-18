import React, { useState } from 'react';
import classNames from 'classnames';
import RequireAnonymous from '../components/require-anonymous';
import Button from '../components/button';
import * as Styles from './forgot-password.module.scss';
import GenericPageTitle from '../components/generic-page-title';
import ColorBar from '../components/color-bar';
import GenericPageCopy from '../components/generic-page-copy';
import FormError from '../components/form-error';
import FormSuccess from '../components/form-success';
import { useAuth } from '../contexts/AuthContext';
import FormProcessing from '../components/form-processing';
import PageDimensions from '../components/page-dimensions';

function ForgotPassword() {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { sendLink } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (isProcessing) {
      return;
    }
    setIsProcessing(true);

    try {
      await sendLink(email);
      setError('');
      setSuccess('Please check your email to update your password.');
    } catch (catchError) {
      setError(catchError.message);
    }

    setIsProcessing(false);
  }

  const pageDimensions = {
    contentType: 'forgot-password',
  };

  return (
    <div className={Styles.root}>
      <RequireAnonymous>
        <PageDimensions dimensions={pageDimensions} />
      </RequireAnonymous>
      <ColorBar />
      <div className={classNames('container', 'container-hpad-md')}>
        <GenericPageTitle>Did you forget?</GenericPageTitle>
        <GenericPageCopy>
          <p>
            Enter the email address you used when you created your account and we&apos;ll send you instructions to reset
            your username and password.
          </p>
        </GenericPageCopy>
        <FormError message={error} />
        <FormSuccess message={success} />
        {!success && (
          <form onSubmit={handleSubmit} className={classNames('container', 'container-xs')}>
            <div className={classNames('form-group')}>
              <label htmlFor="email" className={classNames('form-label')}>
                Email
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
