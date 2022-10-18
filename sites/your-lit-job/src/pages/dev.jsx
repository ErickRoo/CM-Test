import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import GenericPageTitle from '../components/generic-page-title';
import { getInactiveBadges, getUserActiveBadges } from '../utils/badges';
import { useSite } from '../contexts/SiteContext';
import { useAuth } from '../contexts/AuthContext';
import IsAnonymous from '../components/is-anonymous';
import IsUser from '../components/is-user';

function Dev() {
  const [id, setId] = useState();
  const [progress, setProgress] = useState();
  const inactiveBadges = getInactiveBadges();
  const [activeBadges, setActiveBadges] = useState([]);
  const { alerts, popAlert } = useSite();
  const { user, signIn, signOut, addBadgeProgress, profile } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    addBadgeProgress(parseInt(id, 10), progress);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    await signIn(username, password);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();

    await signOut();
  };

  useEffect(() => {
    setActiveBadges(getUserActiveBadges(profile.badges));
  }, [profile.badges]);

  useEffect(() => {
    if (window.location.search === '?show') {
      setShow(true);
    }
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div data-badge-test="true" className={classNames('container')} style={{ width: '100%', padding: '0 20px' }}>
      <GenericPageTitle>Debug Page</GenericPageTitle>
      <div style={{ textAlign: 'left', margin: '2em 0' }}>
        <IsAnonymous>
          <form onSubmit={(e) => handleSignIn(e)}>
            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                Username: <input name="field-username" type="text" onChange={(e) => setUsername(e.target.value)} />
              </label>
            </div>
            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                Password: <input name="field-password" type="text" onChange={(e) => setPassword(e.target.value)} />
              </label>
            </div>
            <input type="submit" title="Submit" />
          </form>
        </IsAnonymous>
        <IsUser>
          <div>
            Logged in as [{user && user.username}].
            <button type="button" onClick={(e) => handleSignOut(e)}>
              Sign out
            </button>
          </div>
        </IsUser>
      </div>

      <div style={{ textAlign: 'left', margin: '2em 0' }}>
        <strong>Trigger Progress</strong>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              ID: <input name="field-id" type="text" onChange={(e) => setId(e.target.value)} />
            </label>
          </div>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              Progress:
              <input name="field-progress" type="text" onChange={(e) => setProgress(e.target.value)} />
            </label>
          </div>
          <input type="submit" title="Submit" />
        </form>
      </div>

      <div style={{ textAlign: 'left', margin: '2em 0' }}>
        <strong>Alerts</strong>
        <ul style={{ fontSize: '0.75em' }}>
          {alerts.length > 0 &&
            alerts.map((alert) => {
              return (
                <li key={alert.id + alert.level}>
                  <strong>Notification</strong>
                  <ul>
                    <li>Badge: {alert.id}</li>
                    <li>Level: {alert.level}</li>
                  </ul>
                </li>
              );
            })}
        </ul>
        <button type="button" onClick={() => popAlert()}>
          Pop alert
        </button>
      </div>

      <div style={{ textAlign: 'left', margin: '2em 0' }}>
        <strong>Badges</strong>
        <ul>
          {activeBadges
            .filter((badge) => badge.completedLevel)
            .sort((a, b) => b.completedLevel - a.completedLevel)
            .slice(0, 4)
            .map((badge) => {
              return <li key={badge.id}>{badge.name}</li>;
            })}
        </ul>
      </div>

      <div style={{ textAlign: 'left', margin: '2em 0' }}>
        <strong>Active Badges</strong>
        <div style={{ fontSize: '0.75em', display: 'flex', flexWrap: 'wrap' }}>
          {activeBadges.map((badge) => {
            return (
              <div key={badge.id} style={{ marginRight: '1em', marginBottom: '1em' }}>
                <strong>{badge.name}</strong>
                <ul>
                  <li>ID: {badge.id}</li>
                  <li>Completed: {badge.completed ? badge.completed.seconds : 0}</li>
                  <li>Completed Level: {badge.completedLevel}</li>
                  <li>
                    Progress ({badge.progress.length}): {badge.progress.join(',')}
                  </li>
                  {badge.allowedProgress && <li>Allowed progress: {badge.allowedProgress.join(',')}</li>}
                  <li>
                    Levels
                    <ul>
                      {badge.levels.map((level) => {
                        return (
                          <li key={badge.id + level.id}>
                            <strong>{level.id}</strong>
                            <ul>
                              <li>ID: {level.id}</li>
                              <li>Completed: {level.completed ? level.completed.seconds : 0}</li>
                              <li>Method: {level.method}</li>
                              <li>Threshold: {level.threshold}</li>
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ textAlign: 'left', margin: '2em 0' }}>
        <strong>Inactive Badges</strong>
        <div style={{ fontSize: '0.75em', display: 'flex', flexWrap: 'wrap' }}>
          {inactiveBadges.map((badge) => {
            return (
              <div key={badge.id} style={{ marginRight: '1em', marginBottom: '1em' }}>
                <strong>{badge.name}</strong>
                <ul>
                  <li>ID: {badge.id}</li>
                  <li>Completed: {badge.completed}</li>
                  <li>Completed Level: {badge.completedLevel ? badge.completedLevel.seconds : 0}</li>
                  <li>
                    Progress ({badge.progress.length}): {badge.progress.join(',')}
                  </li>
                  <li>
                    Levels
                    <ul>
                      {badge.levels.map((level) => {
                        return (
                          <li key={badge.id + level.id}>
                            <strong>{level.id}</strong>
                            <ul>
                              <li>ID: {level.id}</li>
                              <li>Completed: {level.completed ? level.completed.seconds : 0}</li>
                              <li>Method: {level.method}</li>
                              <li>Threshold: {level.threshold}</li>
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dev;
