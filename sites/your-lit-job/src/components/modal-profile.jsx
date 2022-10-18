import React from 'react';
import PropTypes from 'prop-types';
import ModalWindow from './modal-window';
import Modal from './modal';
import * as Styles from './modal-profile.module.scss';
import Profile from './profile';

function ModalProfile({ open, close, showClose }) {
  const handleOnClose = async () => {
    close();
  };

  return (
    <Modal open={open} close={handleOnClose} centerH centerV className={Styles.root}>
      <ModalWindow className={Styles.window} close={handleOnClose} showClose={showClose}>
        <Profile close={close} />
      </ModalWindow>
    </Modal>
  );
}

ModalProfile.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  showClose: PropTypes.bool,
};

ModalProfile.defaultProps = {
  showClose: false,
};

export default ModalProfile;
