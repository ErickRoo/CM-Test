import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import ModalWindow from '../../modal-window';
import Modal from '../../modal';
import * as Styles from './modal-warning.module.scss';

import Heading from '../../heading';
import Button from '../../button';

const motionModalOptions = {
  initial: {
    opacity: 0.2,
    y: 50,
  },
  animate: {
    opacity: 0.99,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

function ModalWarning({ open, close, action, type, text }) {
  const handleAction = () => {
    if (type === 'confirmation') action();
  };

  return (
    <Modal open={open} close={close}>
      <motion.div initial="initial" animate="animate" variants={motionModalOptions} className={Styles.container}>
        <ModalWindow className={Styles.window} close={close} showClose>
          <div>
            <Heading level={1}>Skills Explorer</Heading>
            <p>{text}</p>
            <div className={Styles.buttons}>
              <Button size="md" type="button" theme="green" action={handleAction} width="md">
                {type === 'confirmation' ? 'Yes' : 'Ok'}
              </Button>
              <Button size="md" type="button" theme="transparent" action={close} width="md">
                No
              </Button>
            </div>
          </div>
        </ModalWindow>
      </motion.div>
    </Modal>
  );
}

ModalWarning.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  action: PropTypes.func,
  type: PropTypes.oneOf(['message', 'confirmation']),
  text: PropTypes.string.isRequired,
};

ModalWarning.defaultProps = {
  action: null,
  type: 'message',
};

export default ModalWarning;
