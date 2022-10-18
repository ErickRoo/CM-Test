import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './color-bar.module.scss';

function ColorBar({ sticky, color }) {
  return (
    <div
      className={classNames(Styles.root, { [Styles.sticky]: sticky, [Styles.color]: color })}
      style={{ backgroundColor: color }}
    >
      {!color && (
        <div className={Styles.bands}>
          <span className={Styles.band} />
          <span className={Styles.band} />
          <span className={Styles.band} />
          <span className={Styles.band} />
          <span className={Styles.band} />
          <span className={Styles.band} />
          <span className={Styles.band} />
          <span className={Styles.band} />
        </div>
      )}
    </div>
  );
}

ColorBar.propTypes = {
  sticky: PropTypes.bool,
  color: PropTypes.string,
};

ColorBar.defaultProps = {
  sticky: true,
  color: null,
};

export default ColorBar;
