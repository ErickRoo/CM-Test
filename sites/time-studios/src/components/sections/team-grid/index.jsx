import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import TeamGridItem from './team-grid-item';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function SectionTeamGrid({ people, setCurrentPerson }) {
  const peopleList = people;
  // const peopleList = [people[0], people[1], people[2], people[2], people[0], people[1]];

  const onClick = (person) => {
    setCurrentPerson(person);
  };

  return (
    <div className={cx('SectionTeamGrid')}>
      <div className={cx('inner')}>
        <div className={cx('grid')}>
          {peopleList.map((person) => {
            return <TeamGridItem person={person} key={person.fullName} onClick={onClick} />;
          })}
        </div>
      </div>
    </div>
  );
}

SectionTeamGrid.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,

  setCurrentPerson: PropTypes.func.isRequired,
};

export default SectionTeamGrid;
