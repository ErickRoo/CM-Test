import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as Styles from './card-badge.module.scss';

import Heading from '../../heading';
import BarProgressBadge from '../BarProgressBadge';

function CardBadge({ badge }) {
  const description = badge.completed ? badge.post : badge.pre;

  return (
    <div className={Styles.root}>
      <section
        className={classNames(
          Styles.container,
          badge.completed && Styles.complete,
          !badge.active && Styles.inactive,
          badge.progress.length > 0 ? Styles.hasProgress : Styles.noProgress
        )}
      >
        <GatsbyImage alt={badge.name} image={badge.image} />
        <Heading level={3} className={Styles.title}>
          {badge.name}
        </Heading>
        <p className={Styles.description}>{description || 'Coming Soon'}</p>
        <BarProgressBadge bid={`${badge.id}`} progress={badge.progress} levels={badge.levels} status={badge.active} />
        <svg className={Styles.completeIcon} viewBox="0 0 26 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.6 10.6L6.2 16.3L9.8 19.8L13.3 16.3L25.3 4.3L21.8 0.7L9.8 12.8L4.1 7.1L0.6 10.6Z" />
        </svg>
      </section>
    </div>
  );
}

CardBadge.propTypes = {
  badge: PropTypes.shape({
    active: PropTypes.bool,
    completed: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.object]),
    completedLevel: PropTypes.number,
    pre: PropTypes.string,
    post: PropTypes.string,
    id: PropTypes.number,
    image: PropTypes.shape({
      gatsbyImageData: PropTypes.shape({}),
    }),
    levels: PropTypes.arrayOf(PropTypes.shape({})),
    name: PropTypes.string,
    progress: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  }).isRequired,
};

CardBadge.defaultProps = {};

export default CardBadge;
