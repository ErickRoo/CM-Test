import React, { useRef } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import * as Styles from './profile-recent-badges.module.scss';
import ProfileRecentBadge from './profile-recent-badge';
import { useAuth } from '../contexts/AuthContext';
import { getUserActiveBadges } from '../utils/badges';

const getIconBadges = (activeBadges, allIcons, badgesPerRow) => {
  const emptyIcon = allIcons.nodes.find(({ alt }) => alt === 'empty');
  const fourIcons = Array(badgesPerRow).fill(emptyIcon);

  activeBadges
    .filter(({ completedLevel }) => completedLevel)
    .sort((a, b) => b.completedLevel - a.completedLevel)
    .slice(0, badgesPerRow)
    .forEach(({ name }, index) => {
      fourIcons[index] = name;
    });

  allIcons.nodes.forEach((oneIcon) => {
    let position = -1;
    for (let i = 0; i < fourIcons.length; i += 1) {
      if (oneIcon.alt === fourIcons[i]) {
        position = i;
      }
    }

    if (position >= 0) fourIcons[position] = oneIcon;
  });

  return fourIcons;
};

function ProfileRecentBadges() {
  const badgesPerRow = 4;
  const { profile } = useAuth();
  const { allIcons } = useStaticQuery(
    graphql`
      query QUERY_RECENT_BADGES {
        allIcons: allFile(filter: { relativePath: { regex: "/components/profile-badges/" } }) {
          nodes {
            ...LocalFileFragment
          }
        }
      }
    `
  );
  const badges = getIconBadges(getUserActiveBadges(profile.badges), allIcons, badgesPerRow);
  const snapBadges = useRef(badges);

  return (
    <div>
      <div className={Styles.title}>
        <div className={Styles.textContainer}>
          <div className={Styles.text}>Recent Badges</div>
          <Link to="/profile" className={Styles.viewAll}>
            View all
          </Link>
        </div>
        {badges.length > badgesPerRow && (
          <button className={Styles.viewAll} type="button">
            View all
          </button>
        )}
      </div>
      <ul className={Styles.badges}>
        {badges.map((badge, index) => {
          const key = `oneBadge-${badge.id}-${index}`;
          const isChange = snapBadges.current[index].alt !== badge.alt;

          return (
            <li key={key}>
              <ProfileRecentBadge badge={badge} isChange={isChange} index={index} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProfileRecentBadges;
