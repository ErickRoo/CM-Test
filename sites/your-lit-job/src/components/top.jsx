import React, { useEffect, useState } from 'react';
import { useScrollYPosition } from 'react-use-scroll-position/index';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as Styles from './top.module.scss';

function Top({ className }) {
  const [show, setShow] = useState(false);
  const scrollY = useScrollYPosition();

  useEffect(() => {
    setShow(scrollY > 0);
  }, [scrollY]);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={classNames(Styles.root, className, {
        [Styles.show]: show,
        [Styles.hide]: !show,
      })}
    >
      {/* Intentionally disabling eslint error since back to top is best rendered as a button without a label. */}
      {/* Seeing this implementation on major websites including LinkedIn. */}
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button type="button" className={Styles.button} onClick={toTop} title="Back to top" />
    </div>
  );
}

Top.propTypes = {
  className: PropTypes.string,
};

Top.defaultProps = {
  className: null,
};

export default Top;
