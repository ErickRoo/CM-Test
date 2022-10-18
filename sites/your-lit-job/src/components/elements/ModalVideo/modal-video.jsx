import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { motion, useAnimation } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as Styles from './modal-video.module.scss';
import './modal-video.scss';

import Modal from '../../modal';
import ModalWindow from '../../modal-window';
import Button from '../../button';
import VideoPlayer, { INTRO_VIDEO_ID } from '../../video-player';

const getGImage = (oneImage) => {
  return {
    alt: oneImage.alt,
    image: getImage(oneImage.gImage.gatsbyImageData),
  };
};

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

function ModalVideo({ open, close }) {
  const [mute, setMute] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const controls = useAnimation();

  const { allImages } = useStaticQuery(
    graphql`
      query QUERY_MODAL_VIDEO {
        allImages: allFile(
          filter: { relativePath: { regex: "/components/modal-skills-video/icon/" } }
          sort: { order: ASC, fields: name }
        ) {
          nodes {
            ...LocalFileFragment
          }
        }
      }
    `
  );
  const iconClose = getGImage(allImages.nodes[0]);
  const iconMute = getGImage(allImages.nodes[1]);
  const iconUnmute = getGImage(allImages.nodes[2]);

  useEffect(() => {
    if (open) controls.start(motionFirstOptions);
  }, [open]);

  useEffect(() => {
    if (playerReady) {
      setMute(window.jwplayer().getMute());
      window.jwplayer().on('mute', (ev) => setMute(ev.mute));
    }
  }, [playerReady]);

  const handlePlayerBtnMute = () => {
    if (playerReady) {
      setMute(!mute);
      window.jwplayer().setMute(!mute);
    }
  };

  const handleOnClose = async () => {
    await controls.start(motionLastOptions);
    close();
  };

  return (
    <Modal open={open} close={handleOnClose} className={Styles.root}>
      <ModalWindow className={Styles.window} close={handleOnClose}>
        <motion.div animate={controls}>
          <VideoPlayer
            mediaId={INTRO_VIDEO_ID}
            className={classNames('modal-video-player')}
            mute={mute}
            onReady={() => setPlayerReady(true)}
          />
          {playerReady && (
            <>
              <Button type="button" theme="transparent" className={Styles.buttonClose} action={handleOnClose}>
                <GatsbyImage alt={iconClose.alt} image={iconClose.image} />
              </Button>
              <Button type="button" theme="transparent" className={Styles.buttonMute} action={handlePlayerBtnMute}>
                <GatsbyImage
                  alt={mute ? iconMute.alt : iconUnmute.alt}
                  image={mute ? iconMute.image : iconUnmute.image}
                />
              </Button>
            </>
          )}
        </motion.div>
      </ModalWindow>
    </Modal>
  );
}

ModalVideo.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

ModalVideo.defaultProps = {};

export default ModalVideo;
