import React, { useState } from 'react';
import classNames from 'classnames';
import * as Styles from './sign-up.module.scss';
import { useAuth } from '../contexts/AuthContext';
import ColorBar from '../components/color-bar';
import RequireUser from '../components/require-user';
import Button from '../components/button';
import GenericPageTitle from '../components/generic-page-title';
import FormProcessing from '../components/form-processing';
import PageDimensions from '../components/page-dimensions';

function SignUpOpt() {
  const { signUpDemographics, redirectStashURL, profile } = useAuth();
  const [zipcode, setZipcode] = useState('');
  const [school, setSchool] = useState('');
  const [roles, setRoles] = useState([]);
  const [grade, setGrade] = useState('');
  const [customGrade, setCustomGrade] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  function handleRole(e) {
    const { checked, value: role } = e.target;

    if (checked && role && roles.indexOf(role) === -1) {
      setRoles([...roles, role]);
    } else if (!checked && role && roles.indexOf(role) >= 0) {
      const rolesDupe = [...roles];
      rolesDupe.splice(roles.indexOf(role), 1);
      setRoles(rolesDupe);
    }
  }

  function handleGrade(e) {
    e.preventDefault();

    setGrade(e.target.value);
  }

  function handleCustomGrade(e) {
    e.preventDefault();

    setCustomGrade(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isProcessing) {
      return;
    }

    setIsProcessing(true);

    try {
      await signUpDemographics(zipcode, school, grade === 'other' ? customGrade : grade, roles);
    } catch (catchError) {
      // Intentionally skip error
    }

    setIsProcessing(false);
    redirectStashURL();
  }

  function handleSkip() {
    if (isProcessing) {
      return;
    }

    setIsProcessing(false);
    redirectStashURL();
  }

  const pageDimensions = {};
  const dateOf18 = new Date();
  dateOf18.setHours(23, 59, 59, 59);
  dateOf18.setYear(new Date().getFullYear() - 18);

  let birthYear = false;
  if (profile && profile.birthYear) {
    try {
      birthYear = profile.birthYear.toDate();
    } catch (e) {
      //
    }
  }

  return (
    <div className={Styles.root}>
      <RequireUser to="/sign-in">
        <PageDimensions dimensions={pageDimensions} />
      </RequireUser>
      <ColorBar />

      <div className={classNames('container', 'container-hpad-md')}>
        <GenericPageTitle>Please tell us about yourself</GenericPageTitle>

        <form onSubmit={handleSubmit} className={classNames('container', 'container-xs')}>
          {birthYear && birthYear.getTime() <= dateOf18.getTime() && (
            <div className={classNames('form-group')}>
              <div className={classNames('form-label')}>What best describes you?</div>
              <div className={classNames('form-check')}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className={classNames('form-check-label')}>
                  <input
                    type="checkbox"
                    value="parent"
                    onChange={handleRole}
                    className={classNames('form-check-input')}
                  />
                  Parent
                </label>
              </div>
              <div className={classNames('form-check')}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className={classNames('form-check-label')}>
                  <input
                    type="checkbox"
                    value="teacher"
                    onChange={handleRole}
                    className={classNames('form-check-input')}
                  />
                  Teacher
                </label>
              </div>
            </div>
          )}

          <div className={classNames('form-group')}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="zipcode" className={classNames('form-label')}>
              What zipcode do you live in?
            </label>
            <input
              type="text"
              id="zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              className={classNames('form-control')}
              pattern="[0-9]{5}"
            />
          </div>

          <div className={classNames('form-group')}>
            <label htmlFor="school" className={classNames('form-label')}>
              What school do you attend, teach, or are affiliated with?
              <input
                type="text"
                id="school"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className={classNames('form-control')}
              />
            </label>
          </div>

          <div className={classNames('form-group')}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="grade" className={classNames('form-label')}>
              What grade?
            </label>
            <select id="grade" className={classNames('form-select')} onChange={handleGrade}>
              <option value="">Select a grade</option>
              <option value="3">Third</option>
              <option value="4">Fourth</option>
              <option value="5">Fifth</option>
              <option value="6">Sixth</option>
              <option value="7">Seventh</option>
              <option value="8">Eighth</option>
              <option value="other">Other</option>
            </select>
            {grade === 'other' && (
              <input
                type="text"
                value={customGrade}
                onChange={handleCustomGrade}
                className={classNames('form-control')}
                placeholder="Other grade"
                style={{ marginTop: '10px' }}
              />
            )}
          </div>

          <div className={classNames('form-actions')}>
            <FormProcessing isProcessing={isProcessing}>
              <Button size="md" type="submit" theme="blue" width="md">
                Submit
              </Button>
              <Button
                size="md"
                type="button"
                action={() => {
                  handleSkip();
                }}
                theme="transparent"
                width="md"
                style={{ marginTop: '10px' }}
              >
                Skip
              </Button>
            </FormProcessing>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpOpt;
