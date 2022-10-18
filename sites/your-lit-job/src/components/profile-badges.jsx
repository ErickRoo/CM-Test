import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import { getInactiveBadges, badgesDescriptions, getUserActiveBadges } from '../utils/badges';
import * as Styles from './profile-badges.module.scss';
import BadgeGroup from './sections/BadgeGroup';
import { useAuth } from '../contexts/AuthContext';

const getAditionalData = (badge, icons, fpoIcon) => {
  const foundIcon = icons.find(({ alt }) => alt === badge.name);
  const foundDescription = badgesDescriptions.find(({ id }) => id === badge.id);

  return {
    ...badge,
    ...foundDescription,
    image: getImage(foundIcon ? foundIcon.gImage.gatsbyImageData : fpoIcon.gImage.gatsbyImageData),
  };
};

function ProfileBadges({ className }) {
  const { profile } = useAuth();
  const initInactiveBadges = getInactiveBadges();
  const [initActiveBadges, setInitActiveBadges] = useState([]);

  useEffect(() => {
    setInitActiveBadges(getUserActiveBadges(profile.badges));
  }, [profile.badges]);

  const { allIcons } = useStaticQuery(
    graphql`
      query QUERY_PROFILE_BADGES {
        allIcons: allFile(filter: { relativePath: { regex: "/components/profile-badges/" } }) {
          nodes {
            ...LocalFileFragment
          }
        }
      }
    `
  );

  const fpoIcon = allIcons.nodes.find(({ alt }) => alt === 'fpo');
  const initABadges = initActiveBadges.map((badge) => getAditionalData(badge, allIcons.nodes, fpoIcon));
  const initIBadges = initInactiveBadges.map((badge) => getAditionalData(badge, allIcons.nodes, fpoIcon));

  return (
    <div className={classNames(Styles.root, className)}>
      <BadgeGroup title="My Badges" badges={initABadges} />
      {initIBadges.length > 0 && <BadgeGroup title="Coming Soon" badges={initIBadges} />}
    </div>
  );
}

ProfileBadges.propTypes = {
  className: PropTypes.string,
};

ProfileBadges.defaultProps = {
  className: null,
};

export default ProfileBadges;
