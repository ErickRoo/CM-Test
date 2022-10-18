import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { motion, useAnimation } from 'framer-motion';
import classNames from 'classnames';
import * as Styles from './summary-header.module.scss';

import Heading from '../../heading';
import Button from '../../button';
import SummaryAnimationShield from '../../elements/SummaryAnimationShield';

const motionShieldOptions = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.5,
    },
  },
};

const motionBarOptions = {
  initial: {
    opacity: 0,
    backgroundColor: '#fff',
  },
  transition: {
    ease: 'easeOut',
    duration: 2,
  },
};

const getBtnColors = (index, selected, skills) => ({
  backgroundColor: index === selected ? '#fff' : skills?.[selected]?.backgroundColor,
  color: index === selected ? skills?.[selected]?.foregroundColor : '#fff',
});

function SummaryHeader({ images, skillsSorted, action, setReference }) {
  const [selected, setSelected] = useState(0);
  const btnsControls = useAnimation();
  const btnControls = useAnimation();
  const buttonsRef = useRef(null);
  const allIcons = { left: [], right: [] };
  let headerBg;
  let shield;

  images.forEach((img) => {
    const image = getImage(img?.gImage?.gatsbyImageData);
    const newImg = { ...img, image };
    if (newImg.alt === 'header-background') headerBg = newImg;
    else if (newImg.alt === 'shield') shield = newImg;
    else if (newImg.alt.indexOf('emoji-l') >= 0) allIcons.left.push(newImg);
    else if (newImg.alt.indexOf('emoji-r') >= 0) allIcons.right.push(newImg);
  });

  useEffect(() => {
    btnsControls.start({
      backgroundColor: skillsSorted[selected].foregroundColor,
      transition: motionBarOptions.transition,
      opacity: 1,
    });
  }, []);

  const handleSelection = (posSelected) => {
    setSelected(posSelected);
    action({ ...skillsSorted[posSelected], position: posSelected });

    btnsControls.start({ backgroundColor: skillsSorted[posSelected].foregroundColor });
    btnControls.start((index) => getBtnColors(index, posSelected, skillsSorted));
  };

  const disableAnimation = (index) => {
    if (selected === index) {
      return null;
    }
    return Styles.buttonAnimation;
  };

  const handleReference = (reference) => {
    buttonsRef.current = reference;
    setReference(reference);
  };

  return (
    <>
      <motion.div className={Styles.shield} initial="initial" animate="animate" variants={motionShieldOptions}>
        <div className={Styles.background}>
          <GatsbyImage alt={headerBg?.alt} image={headerBg?.image} />
        </div>
        <div className={Styles.container}>
          {Object.entries(allIcons).map(([name, icons]) => (
            <section key={`card-images-${name}`} className={classNames(Styles.icons, Styles[`icons__${name}`])}>
              {icons.map((oneImage, index) => {
                const key = `${oneImage.id}-${index}`;
                return <GatsbyImage key={key} alt={oneImage.alt} image={oneImage.image} />;
              })}
            </section>
          ))}
          <section className={Styles.center}>
            <Heading level={1}>Your Skills Summary</Heading>
            <p>
              We’ve analyzed your answers. Read the results below. Click on each of your top three traits to learn more.
              What rings true? Considering your skills, interests, and passions is the first step toward a career path
              that’s your perfect fit.
            </p>
            <SummaryAnimationShield
              shieldImage={shield}
              skillsSorted={skillsSorted}
              buttonsRef={buttonsRef}
              action={handleSelection}
            />
          </section>
        </div>
      </motion.div>
      <motion.div className={Styles.bar} initial="initial" animate={btnsControls} variants={motionBarOptions}>
        <ul ref={handleReference} className={Styles.buttonsSection}>
          {skillsSorted
            .filter((_, index) => index < 3)
            .map(({ id }, index) => {
              const key = `skill-${id}-button-${index}`;

              return (
                <motion.li
                  key={key}
                  className={classNames(Styles.button, disableAnimation(index))}
                  custom={index}
                  animate={btnControls}
                  initial={getBtnColors(index, 0, skillsSorted)}
                >
                  <Button type="button" theme="transparent" action={() => handleSelection(index)}>
                    <h2>{`#${index + 1} ${id}`}</h2>
                  </Button>
                </motion.li>
              );
            })}
        </ul>
      </motion.div>
    </>
  );
}

SummaryHeader.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      alt: PropTypes.string,
      path: PropTypes.string,
      src: PropTypes.string,
      gImage: PropTypes.shape({
        gatsbyImageData: PropTypes.shape({}),
      }),
    })
  ),
  skillsSorted: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      foregroundColor: PropTypes.string,
      backgroundColor: PropTypes.string,
    })
  ).isRequired,
  action: PropTypes.func,
  setReference: PropTypes.func,
};

SummaryHeader.defaultProps = {
  images: null,
  action: null,
  setReference: null,
};

export default SummaryHeader;
