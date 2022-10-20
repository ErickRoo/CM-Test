import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './summary-description.module.scss';

import Heading from '../../heading';

const getLeftPositions = (ref) => {
  const offset = 48;

  if (!ref?.current) {
    const part = (window.innerWidth - 320) / 6;
    const leftPos = part - offset;
    const centerPos = part * 3 - offset;
    const rightPos = part * 5 - offset;
    return [leftPos, centerPos, rightPos];
  }

  const positionsList = Array.from(ref.current.children).map(
    (button) => button.offsetLeft + button.offsetWidth / 2 - offset
  );
  return positionsList;
};

function SummaryDescription({ id, position, subtitle, description, buttonsRef, color }) {
  const [leftPositions, setLeftPositions] = useState([]);

  useEffect(() => {
    const positionsList = getLeftPositions(buttonsRef);
    setLeftPositions(positionsList);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const positionsList = getLeftPositions(buttonsRef);
      setLeftPositions(positionsList);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [buttonsRef]);

  return (
    <div className={Styles.root}>
      <section
        className={classNames(Styles.shape, Styles[`show__${position + 1}`], Styles[`shape__${id}`])}
        style={{ left: leftPositions[position], backgroundColor: color }}
      />
      <section className={classNames(Styles.text, Styles[`text__${id}`])} style={{ borderColor: color }}>
        <Heading level={3}>{subtitle}</Heading>
        <p>{description}</p>
      </section>
    </div>
  );
}

SummaryDescription.propTypes = {
  id: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonsRef: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  color: PropTypes.string.isRequired,
};

SummaryDescription.defaultProps = {
  buttonsRef: null,
};

export default SummaryDescription;
