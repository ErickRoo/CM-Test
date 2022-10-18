import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './color-box.module.scss';

function ColorBox({ children }) {
  return (
    <div className={classNames(Styles.root)}>
      <div className={Styles.boxWrap}>
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
        {children}
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
      </div>
    </div>
  );
}

ColorBox.propTypes = {
  children: PropTypes.shape({}),
};

ColorBox.defaultProps = {
  children: {},
};

export default ColorBox;
