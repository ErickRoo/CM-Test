import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './slider-background-icons.module.scss';

import SliderOneIcon from '../SliderOneIcon';

function SliderBackgroundIcons({ qid, allIcons, mouseMoveOnSlider, cancelMotionOneIcon, onSelect }) {
  const total = parseInt(allIcons.length / 2, 10);
  const iconList = Array(total).fill({});

  allIcons
    .filter((_, index) => index > 0)
    .forEach((icon, index) => {
      const pointer = Math.round((index - 1) / 2);
      const key = index % 2 ? 'hover' : 'normal';

      iconList[pointer] = {
        ...iconList[pointer],
        [key]: icon,
      };
    });

  return (
    <>
      <div className={Styles.line}>
        <div />
        <hr />
      </div>
      <div className={Styles.icons}>
        {iconList?.map((oneIcon, index) => {
          const key = `bgIcon-${qid}-${index}`;
          return (
            <SliderOneIcon
              key={key}
              pairIcons={oneIcon}
              onSelect={() => onSelect(index + 1)}
              cancelMotion={cancelMotionOneIcon}
              mouseMoveOnSlider={mouseMoveOnSlider}
            />
          );
        })}
      </div>
    </>
  );
}

SliderBackgroundIcons.propTypes = {
  qid: PropTypes.string.isRequired,
  allIcons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      src: PropTypes.string,
    })
  ).isRequired,
  mouseMoveOnSlider: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  onSelect: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  cancelMotionOneIcon: PropTypes.bool,
};

SliderBackgroundIcons.defaultProps = {
  onSelect: null,
  mouseMoveOnSlider: null,
  cancelMotionOneIcon: false,
};

export default SliderBackgroundIcons;
