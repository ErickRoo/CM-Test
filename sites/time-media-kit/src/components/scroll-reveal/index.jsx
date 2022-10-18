import React from 'react';
import classNames from 'classnames/bind';
import { useInView } from 'react-intersection-observer';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function ScrollReveal({ threshold = 0.2, children }) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });

  return (
    <div className={cx('ScrollReveal', { revealed: inView })} ref={ref}>{children}</div>
  );
};

export default ScrollReveal;
