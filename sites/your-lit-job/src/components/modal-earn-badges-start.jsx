import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';
import classNames from 'classnames';
import { navigate } from 'gatsby';
import { motion, useAnimation } from 'framer-motion';
import ModalWindow from './modal-window';
import Modal from './modal';
import * as Styles from './modal-skills-explorer-start.module.scss';
import Button from './button';
import { trackEvent } from '../utils/track';

const motionLastOptions = {
  opacity: 0,
  y: 50,
  transition: {
    duration: 0.4,
    ease: 'easeIn',
  },
};

function ModalBadgesStart({ open, close, showClose }) {
  const controls = useAnimation();

  useEffect(() => {
    if (open) {
      trackEvent('Badges', 'Impression on signup start', 'homepage', null, {
        non_interaction: true,
      });
    }
  }, [open]);

  const handleRedirect = () => {
    navigate('/profile/', { state: { fromModal: true } });
  };

  const handleOnClose = async () => {
    await controls.start(motionLastOptions);
    close();
  };

  return (
    <Modal open={open} close={handleOnClose} centerH centerV>
      <motion.div animate={controls}>
        <ModalWindow className={Styles.window} close={handleOnClose} showClose={showClose}>
          <div className={Styles.content}>
            <StaticImage
              src="../assets/components/modal-badges/header.jpg"
              className={classNames(Styles.image)}
              alt=""
            />
            <p className={Styles.title}>Earn Badges</p>
            <div className={Styles.copy}>
              <p>You&apos;ll receive badges as you work your way toward your future. How many can you collect?</p>
            </div>
            <div className={Styles.buttons}>
              <Button
                size="md"
                type="button"
                theme="green"
                width="md"
                action={handleRedirect}
                className={Styles.button}
                onClick={() => trackEvent('Skills Explorer', 'Click on signup start', 'homepage')}
              >
                Go to Badges
              </Button>
            </div>
          </div>
        </ModalWindow>
      </motion.div>
    </Modal>
  );
}

ModalBadgesStart.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  showClose: PropTypes.bool,
};

ModalBadgesStart.defaultProps = {
  showClose: false,
};

export default ModalBadgesStart;
