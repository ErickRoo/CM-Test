import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import * as Styles from './badge-group.module.scss';
import IsUser from '../../is-user';
import IsAnonymous from '../../is-anonymous';
import Heading from '../../heading';
import CardBadge from '../../elements/CardBadge';

function BadgeGroup({ title, badges }) {
  return (
    <section className={Styles.root}>
      <IsUser>
        <Heading level={2}>{title}</Heading>
        {title === 'My Badges' && (
          <>
            <div>
              As you explore your future, you&apos;ll earn badges to mark your progress. Check back often to see how far
              you&apos;ve come.
            </div>
            <div>
              <Link as={Link} className={Styles.link} to="/">
                Continue earning badges!
              </Link>
            </div>
          </>
        )}
      </IsUser>
      <IsAnonymous>
        <Heading level={2}>Customized Profile & Badges</Heading>
        {title === 'My Badges' && (
          <>
            <div>To customize your profile and earn badges, take the Skills Explorer!</div>
            <div>
              <Link as={Link} className={Styles.link} to="/skills-explorer/">
                Take Skills Explorer
              </Link>
            </div>
          </>
        )}
        <Heading level={2}>{title}</Heading>
      </IsAnonymous>
      <div className={Styles.container}>
        {badges.map((badge, index) => {
          const key = `badge-card-${badge.id}-${index}`;
          return <CardBadge key={key} badge={badge} />;
        })}
      </div>
    </section>
  );
}

BadgeGroup.propTypes = {
  title: PropTypes.string,
  badges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
};

BadgeGroup.defaultProps = {
  title: '',
};

export default BadgeGroup;
