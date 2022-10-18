import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, useAnimation } from 'framer-motion';
import * as Styles from './summary-body.module.scss';

import { setStylePropertyColorAsGlobal } from '../../../utils/skills-summary';
import SummaryDescription from '../../elements/SummaryDescription';
import SummaryPoints from '../../elements/SummaryPoints';
import FeaturedJobs from '../../featured-jobs';
import SummaryPeople from '../../elements/SummaryPeople';

const motionFirstOptions = {
  opacity: 0,
};

const motionSecondOptions = (useDelay) => ({
  opacity: 1,
  transition: {
    delay: useDelay && 1.1,
    ease: 'easeInOut',
  },
});

const initSkill = {
  id: '',
  value: 0,
  position: 0,
  subtitle: '',
  description: '',
  points: [],
  jobs: [],
  people: [],
};

function SummaryBody({ skillContent, buttonsRef }) {
  const [skill, setSkill] = useState(initSkill);
  const controls = useAnimation();

  const handleChangeSkill = async () => {
    await controls.start(motionFirstOptions);
    setSkill(skillContent);
    controls.start(motionSecondOptions(skill.id.length <= 0));

    setStylePropertyColorAsGlobal(skillContent.foregroundColor, skillContent.backgroundColor);
  };

  useEffect(() => {
    if (skillContent.id !== skill.id) handleChangeSkill();
  }, [skillContent]);

  return (
    <section className={Styles.root}>
      <motion.div initial={motionFirstOptions} animate={controls}>
        <SummaryDescription
          id={skill.id}
          position={skill.position}
          subtitle={skill.subtitle}
          description={skill.description}
          buttonsRef={buttonsRef}
          color={skill.foregroundColor}
        />
        <SummaryPoints id={skill.id} skillsPoints={skill.skillsPoints} />
        <FeaturedJobs
          jobs={skill?.jobs}
          headingLevel={2}
          className={Styles.featuredJobs}
          title="You might be a/an..."
          foregroundColor={skill.foregroundColor}
          showHeatHighlight
        />
        <SummaryPeople skillId={skill.id} people={skill.people} headingLevel={2} className={Styles.people} />
      </motion.div>
    </section>
  );
}

SummaryBody.propTypes = {
  skillContent: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.number,
    position: PropTypes.number,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    skillsPoints: PropTypes.arrayOf(PropTypes.shape({})),
    jobs: PropTypes.arrayOf(PropTypes.shape({})),
    people: PropTypes.arrayOf(PropTypes.shape({})),
    foregroundColor: PropTypes.string,
    backgroundColor: PropTypes.string,
  }).isRequired,
  buttonsRef: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
};

SummaryBody.defaultProps = {
  buttonsRef: null,
};

export default SummaryBody;
