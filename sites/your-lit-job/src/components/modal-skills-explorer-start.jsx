import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { motion, useAnimation } from 'framer-motion';
import VideoPlayer, { INTRO_VIDEO_ID } from './video-player';
import ModalWindow from './modal-window';
import Modal from './modal';
import * as Styles from './modal-skills-explorer-start.module.scss';
import Button from './button';
import { trackEvent } from '../utils/track';

const motionFirstOptions = {
  opacity: [0.8, 0.9, 1],
  y: [50, 45, 0],
  transition: {
    duration: 1,
    ease: 'easeInOut',
    times: [0, 0.2, 1],
  },
};

const motionLastOptions = {
  opacity: 0,
  y: 50,
  transition: {
    duration: 0.4,
    ease: 'easeIn',
  },
};
function ModalSkillsExplorerStart({ open, close, showClose }) {
  const [mute, setMute] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (open) controls.start(motionFirstOptions);
  }, [open]);

  useEffect(() => {
    if (playerReady) {
      setMute(window.jwplayer().getMute());
      window.jwplayer().on('mute', (ev) => setMute(ev.mute));
    }
  }, [playerReady]);

  useEffect(() => {
    if (open) {
      trackEvent('Skills Explorer', 'Impression on signup start', 'homepage', null, {
        non_interaction: true,
      });
    }
  }, [open]);

  const handleRedirect = () => {
    navigate('/skills-explorer/', { state: { fromModal: true } });
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
            <VideoPlayer
              mediaId={INTRO_VIDEO_ID}
              mute={mute}
              autoPlay
              onReady={() => setPlayerReady(true)}
              rounded="top-med"
            />

            <div className={Styles.copy}>
              <p>
                Welcome to Your 🔥 Job! Get ready to find your future career. The first step? Sign up for your
                personalized experience.
              </p>
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
                Let&apos;s Go!
              </Button>
            </div>
          </div>
        </ModalWindow>
      </motion.div>
    </Modal>
  );
}

ModalSkillsExplorerStart.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  showClose: PropTypes.bool,
};

ModalSkillsExplorerStart.defaultProps = {
  showClose: false,
};

export default ModalSkillsExplorerStart;
