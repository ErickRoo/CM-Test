import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './card-job-heat-icons.module.scss';

function CardJobHeatIcons({ quantity }) {
  const textList = ['Cooling Down', 'Keeping Cool', 'Getting Warm', 'Heating Up', 'On Fire', 'Burning Hot'];

  return (
    <div className={Styles.root}>
      <span>{textList[quantity - 1]}</span>
      <ul>
        {Array(quantity)
          .fill()
          .map((_, index) => {
            const key = `heat-icon-dark-${index}`;
            return <li key={key} className={Styles.heatIcon__dark} />;
          })}
        {Array(6 - quantity)
          .fill()
          .map((_, index) => {
            const key = `heat-icon-grey-${index}`;
            return <li key={key} className={Styles.heatIcon__grey} />;
          })}
      </ul>
    </div>
  );
}

CardJobHeatIcons.propTypes = {
  quantity: PropTypes.number,
};

CardJobHeatIcons.defaultProps = {
  quantity: 0,
};

export default CardJobHeatIcons;
