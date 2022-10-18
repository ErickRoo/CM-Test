import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { motion, useAnimation } from 'framer-motion';
import classNames from 'classnames';
import * as Styles from './summary-people.module.scss';

import Heading from '../../heading';
import CarouselStack from '../../carousel-stack';
import RichText from '../../rich-text';
import { getMinimalItems } from '../../../utils/carousel-utils';

const motionOptions = {
  hide: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  show: {
    opacity: 1,
  },
};

function SummaryPeople({ skillId, people, headingLevel, className }) {
  const controls = useAnimation();
  const [selected, setSelected] = useState(0);
  const listItems = getMinimalItems(people);
  const personSelected = listItems?.[selected]?.oneItem ?? {};

  useEffect(() => {
    setSelected(0);
  }, [skillId]);

  const onUpdatePosition = async (position) => {
    await controls.start('hide');
    setSelected(position);
    controls.start('show');
  };

  if (!(listItems?.length > 0)) {
    return null;
  }

  return (
    <div className={classNames(Styles.root, className)}>
      <Heading level={headingLevel} className={Styles.title}>
        You might get along well with…
      </Heading>
      <CarouselStack
        id={skillId}
        className={Styles.carouselStack}
        listItems={listItems}
        onUpdatePosition={onUpdatePosition}
      />
      {personSelected?.description && (
        <motion.div className={Styles.description} animate={controls} variants={motionOptions}>
          <Heading level={headingLevel + 1}>{personSelected?.title}</Heading>
          {personSelected?.strengths?.map((strength, index) => {
            const key = `strength-person-${personSelected?.id}-${index}`;

            return <span key={key}>{strength}</span>;
          })}
          <RichText body={personSelected?.description} />
        </motion.div>
      )}
    </div>
  );
}

SummaryPeople.propTypes = {
  className: PropTypes.string,
  headingLevel: PropTypes.number,
  skillId: PropTypes.string.isRequired,
  people: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.shape({}),
      strengths: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};

SummaryPeople.defaultProps = {
  className: null,
  headingLevel: 0,
  people: null,
};

export const query = graphql`
  fragment PersonFields on ContentfulPerson {
    contentful_id
    id
    title
    strengths
    description {
      raw
    }
    primaryImage {
      alt: title
      gatsbyImageData(width: 1024, placeholder: BLURRED)
    }
  }
`;

export default SummaryPeople;
