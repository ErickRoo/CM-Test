import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link, useStaticQuery, graphql } from 'gatsby';
// eslint-disable-next-line import/no-unresolved
import { useLocation } from '@reach/router';
import * as Styles from './profile.module.scss';
import Avatar from './avatar';
import ProfileRecentBadges from './profile-recent-badges';
import { skills as skillsConfig, sortSkills, findTagIdBySkill } from '../utils/skill';
import { useAuth } from '../contexts/AuthContext';
import IsAnonymous from './is-anonymous';
import IsUser from './is-user';
import Button from './button';
import { hasTagById } from '../utils/tag';

function Profile({ className, close }) {
  const [sortedSkills, setSortedSkills] = useState([]);
  const { user, profile, setStashURL } = useAuth();
  const location = useLocation();
  const skillsData = useStaticQuery(graphql`
    query SkillsQuery {
      allContentfulSkillsExplorer {
        nodes {
          metadata {
            tags {
              name
              contentful_id
            }
          }
          foregroundColor
          backgroundColor
          title
        }
      }
    }
  `);

  useEffect(() => {
    setSortedSkills(sortSkills(profile.skills));
  }, [profile.skills]);

  function handleSignIn() {
    if (close) {
      close();
    }
    setStashURL(location.pathname);
  }

  function getSkillDataByTagId(id) {
    const skills = skillsData.allContentfulSkillsExplorer.nodes;

    return skills.find((skill) => {
      return hasTagById(id, skill.metadata.tags);
    });
  }

  return (
    <div className={classNames(Styles.root, className)}>
      <div className={Styles.profileInfo}>
        <Link to="/profile" onClick={close}>
          <Avatar className={Styles.profileAvatar} avatar={profile.avatar} />
        </Link>
        <IsUser>
          <div className={Styles.profileIdentity}>
            {user && <div className={Styles.profileName}>{profile.username}</div>}
            <Link to="/sign-out" className={Styles.signOut}>
              Sign Out
            </Link>
          </div>
        </IsUser>
        <IsAnonymous>
          <Button
            type="link"
            action="/sign-in"
            onClick={() => {
              handleSignIn();
            }}
            theme="blue"
            size="sm"
            className={Styles.signIn}
          >
            Sign In
          </Button>
        </IsAnonymous>
      </div>
      <div className={Styles.skillsHeading}>I am...</div>

      {profile.completedSkills ? (
        <ul className={Styles.skills}>
          {sortedSkills.length > 0 &&
            sortedSkills.slice(0, 3).map((skill) => {
              const skillData = getSkillDataByTagId(findTagIdBySkill(skill.id));

              return (
                <li key={skill.id}>
                  <div className={Styles.skillName}>{skill.id}</div>
                  <div className={Styles.skillBar}>
                    <div className={Styles.skillBarBack}>
                      <div
                        className={classNames(Styles.skillBarInner)}
                        style={{
                          width: `calc(${(skill.value / 30) * 100}% - 4px)`,
                          backgroundColor: skillData.foregroundColor,
                        }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      ) : (
        <ul className={classNames(Styles.skills, Styles.disabled)}>
          {Object.keys(skillsConfig)
            .slice(0, 3)
            .map((skill, index) => {
              const skillData = getSkillDataByTagId(findTagIdBySkill(skill));

              return (
                <li key={skill}>
                  <div className={Styles.skillName}>{skill}</div>
                  <div className={Styles.skillBar}>
                    <div className={Styles.skillBarBack}>
                      <div
                        className={classNames(Styles.skillBarInner)}
                        style={{
                          width: `${80 - index * 10}%`,
                          backgroundColor: skillData.foregroundColor,
                        }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      )}

      {profile.completedSkills ? (
        <ProfileRecentBadges />
      ) : (
        <Button size="sm" type="link" action="/skills-explorer/" width="fill" theme="green" onClick={close}>
          Take Skills Explorer
        </Button>
      )}
    </div>
  );
}

Profile.propTypes = {
  className: PropTypes.string,
  close: PropTypes.func,
};

Profile.defaultProps = {
  className: null,
  close: null,
};

export default Profile;
