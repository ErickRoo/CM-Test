import React from 'react';
import classNames from 'classnames/bind';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Modal({ opened, setModalStatus, children }) {
  return (
    <>
      <div className={cx('overlay', { active: opened })} onClick={() => setModalStatus('closed')} />
      <div className={cx('Modal', { opened })}>
        <button type="button" className={cx('closeBtn')} onClick={() => setModalStatus('closed')}>✕</button>
        <div>{children}</div>
      </div>
    </>
  );
}

export default Modal;
