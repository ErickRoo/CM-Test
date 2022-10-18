import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './tool-tip.module.scss';
import breakpoints from '../utils/breakpoints';

function ToolTip({ children, position, parent, offset }) {
  const [isVisible, setIsVisible] = useState(false);

  const style = () => {
    return {
      ...(position === 'top' && { top: offset }),
      ...(position === 'bottom' && { bottom: offset }),
    };
  };

  useEffect(() => {
    const mouseEnter = () => {
      setIsVisible(true);
    };

    const mouseLeave = () => {
      setIsVisible(false);
    };

    if (window.matchMedia(breakpoints.hover).matches) {
      parent.current.addEventListener('mouseenter', mouseEnter);
      parent.current.addEventListener('mouseleave', mouseLeave);
    }

    return () => {
      if (parent && parent.current) {
        parent.current.removeEventListener('mouseenter', mouseEnter);
        parent.current.removeEventListener('mouseleave', mouseLeave);
      }
    };
  }, [parent]);

  if (!parent.current) {
    return null;
  }

  return (
    <div
      className={classNames(Styles.root, {
        [Styles.positionTop]: position === 'top',
        [Styles.positionBottom]: position === 'bottom',
      })}
      data-visible={isVisible}
      style={style()}
    >
      <div className={Styles.inner}>{children}</div>
    </div>
  );
}

ToolTip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  position: PropTypes.string,
  parent: PropTypes.shape({
    // Intentionally disabled after some content types break on server render and other break in client render
    // eslint-disable-next-line react/forbid-prop-types
    current: PropTypes.any,
  }).isRequired,
  offset: PropTypes.number,
};

ToolTip.defaultProps = {
  position: 'top',
  offset: 0,
};

export default ToolTip;
