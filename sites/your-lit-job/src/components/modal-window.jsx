import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './modal-window.module.scss';
import ModalX from './modal-x';

function ModalWindow({ children, className, close, showClose, type }) {
  return (
    <div className={classNames(Styles.root, className, type === 'questionnaire' && Styles.questionnaire)}>
      <div className={classNames(Styles.content, type === 'questionnaire' && Styles.questionnaire)}>
        {showClose && <ModalX close={close} className={Styles.close} />}
        {children}
      </div>
    </div>
  );
}

ModalWindow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  close: PropTypes.func.isRequired,
  showClose: PropTypes.bool,
  type: PropTypes.string,
};

ModalWindow.defaultProps = {
  className: null,
  showClose: false,
  type: null,
};

export default ModalWindow;
