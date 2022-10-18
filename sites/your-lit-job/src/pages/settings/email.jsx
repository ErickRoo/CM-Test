import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';
import classNames from 'classnames';
import RequireUser from '../../components/require-user';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/button';
import * as Styles from './email.module.scss';
import GenericPageTitle from '../../components/generic-page-title';
import ColorBar from '../../components/color-bar';
import FormError from '../../components/form-error';
import FormProcessing from '../../components/form-processing';
import PageDimensions from '../../components/page-dimensions';

function Email() {
  const { setEmail } = useAuth();
  const [error, setError] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newEmailConfirmation, setNewEmailConfirmation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (isProcessing) {
      return;
    }
    setIsProcessing(true);

    try {
      if (newEmail !== newEmailConfirmation) {
        throw new Error('Emails do not match');
      }

      await setEmail(newEmail);
      setError('');
      navigate('/profile');
    } catch (catchError) {
      setError(catchError.message);
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
        <GenericPageTitle>Update Email</GenericPageTitle>
        <FormError message={error} />
        <form onSubmit={handleSubmit} className={classNames('container', 'container-xs')}>
          <div className={classNames('form-group')}>
            <label htmlFor="new-email" className={classNames('form-label')}>
              New Email
              <input
                id="new-email"
                value={newEmail}
                type="email"
                required
                onChange={(e) => setNewEmail(e.target.value)}
                className={classNames('form-control')}
              />
            </label>
          </div>
          <div className={classNames('form-group')}>
            <label htmlFor="new-email-confirm" className={classNames('form-label')}>
              Confirm New Email
              <input
                id="new-email-confirm"
                value={newEmailConfirmation}
                type="email"
                required
                onChange={(e) => setNewEmailConfirmation(e.target.value)}
                className={classNames('form-control')}
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
      </div>
      <Link to="/settings" className={Styles.link}>
        Back to Account Settings
      </Link>
    </div>
  );
}

export default Email;
