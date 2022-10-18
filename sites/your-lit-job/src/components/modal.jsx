import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ModalAccessibility from '@curiousmedia/modal-accessibility';
import * as Styles from './modal.module.scss';

function Modal({ open, className, children, close }) {
  const modalRef = useRef(null);
  const [modalAccessibility, setModalAccessibility] = useState(null);

  const dimClick = (e) => {
    if (e.target === modalRef.current) {
      close();
    }
  };

  useEffect(() => {
    setModalAccessibility(
      new ModalAccessibility(document.createElement('div'), () => {
        close();
      })
    );
  }, []);

  useEffect(() => {
    if (open && modalAccessibility) {
      modalAccessibility.modal = modalRef.current;
      modalAccessibility.open();
    } else if (modalAccessibility) {
      modalAccessibility.close();
      modalAccessibility.destroyEvents();
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    // Disabled as escape is already being listened for in Modal Accessibility class
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <div
      role="dialog"
      aria-modal="true"
      className={classNames(Styles.root, className)}
      data-open={open ? 1 : 0}
      ref={modalRef}
      onClick={dimClick}
    >
      <div className={Styles.scroll}>
        <div className={Styles.outer}>
          <div className={Styles.inner}>{children}</div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  open: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

Modal.defaultProps = {
  open: false,
  className: null,
};

export default Modal;
