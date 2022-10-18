import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql, navigate } from 'gatsby';
import * as Styles from './summary.module.scss';

import ColorBar from '../../components/color-bar';
import SummaryHeader from '../../components/sections/SummaryHeader';
import SummaryBody from '../../components/sections/SummaryBody';
import SummaryFooter from '../../components/sections/SummaryFooter';
import PageDimensions from '../../components/page-dimensions';
import RequireUser from '../../components/require-user';
import { useAuth } from '../../contexts/AuthContext';
import {
  reorderSkillsContent,
  getSkillContent,
  getFirstThreeSkillsContent,
  getSkillsContent,
} from '../../utils/skills-summary';

// @TODO maybe this object will be unnessary after implement contentful in each section
const localSkillsContent = {
  realistic: {
    subtitle: `You get things done.`,
    description: `You know what's up. You care about the things that have a real impact on your life. Other people worry about abstract ideas and hypothetical situations. But not you! You value what's real: the things you can see, touch, and use.`,
  },
  investigative: {
    subtitle: `You think things through.`,
    description: `You observe the world with a keen eye. You're eager to ask questions—and you love finding answers. When faced with a problem, you aren't satisfied until you've thought of a solution. Your brain can do some pretty amazing things.`,
  },
  artistic: {
    subtitle: `You love to create.`,
    description: `Go ahead, express yourself! You get excited about creative projects. When you unleash your imagination, there's no telling where it will take you. And you've got what it takes to bring your creation to life, whether it's a poem or digital artwork.`,
  },
  social: {
    subtitle: `You're here to help.`,
    description: `You shine brightest when surrounded by friends and family. When you see someone struggling, you have a deep desire to help out. The world needs more people like you. When you have a concern, you jump into action.`,
  },
  enterprising: {
    subtitle: `You have persuasive powers.`,
    description: `You loved being line leader in kindergarten, didn't you? Being enterprising means you like to be in charge, and you're probably pretty good at it. It also means you like working with others and have strong speaking and presenting skills.`,
  },
  conventional: {
    subtitle: `You keep it all organized.`,
    description: `You care about details. Numbers, data, facts: You're on top of it all. Do you have an organizational system for your notes? Categorized music playlists? We wouldn't be surprised. You just like things to make sense.`,
  },
};

function SkillsSummary({ data }) {
  const allImages = data.allImages.nodes;
  const contentfulSkillsContent = reorderSkillsContent(data.skillsContent.nodes);
  const buttonsRef = useRef(null);
  const { isSignedIn, isLoaded, profile } = useAuth();
  const { skills, completedSkills: quizCompleted } = profile;
  const [skillsSorted, setSkillsSorted] = useState([]);
  const [skillSelected, setSkillSelected] = useState({ id: '', value: 0, position: 0 });

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      if (!quizCompleted) {
        navigate('/skills-explorer');
      } else {
        const keys = ['backgroundColor', 'foregroundColor'];
        const skillsContent = getSkillsContent(skills, {}, contentfulSkillsContent, 3, keys);
        setSkillsSorted(skillsContent);
        setSkillSelected({ ...skillsContent[0], position: 0 });
      }
    }
  }, [isLoaded, quizCompleted, isSignedIn]);

  const setReference = (reference) => {
    buttonsRef.current = reference;
  };

  const skillContent = getSkillContent(skillSelected, localSkillsContent, contentfulSkillsContent);
  const threeSkills = getFirstThreeSkillsContent(skillsSorted, localSkillsContent, contentfulSkillsContent);
  const pageDimensions = {
    contentType: 'Skills explorer',
  };

  return (
    <>
      <RequireUser to="/sign-up">
        <PageDimensions dimensions={pageDimensions} />
      </RequireUser>
      <div className={Styles.root}>
        <ColorBar />
        {skillsSorted.length > 0 && (
          <>
            <SummaryHeader
              images={allImages}
              skillsSorted={skillsSorted}
              action={setSkillSelected}
              setReference={setReference}
            />
            <SummaryBody skillContent={skillContent} buttonsRef={buttonsRef} />
            <SummaryFooter threeSkills={threeSkills} />
          </>
        )}
      </div>
    </>
  );
}

const GatsbyImages = PropTypes.shape({
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      alt: PropTypes.string,
      gImage: PropTypes.shape({
        gatsbyImageData: PropTypes.shape({}),
      }),
    })
  ),
});

SkillsSummary.propTypes = {
  data: PropTypes.shape({
    allImages: GatsbyImages,
    skillsContent: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
          foregroundColor: PropTypes.string,
          jobs: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string,
            })
          ),
          metadata: PropTypes.shape({
            tags: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.string,
                name: PropTypes.string,
              })
            ),
          }),
          skillsPoints: PropTypes.arrayOf(
            PropTypes.shape({
              skillPointTitle: PropTypes.string,
              cardDescription: PropTypes.shape({
                description: PropTypes.string,
              }),
            })
          ),
        })
      ),
    }),
  }).isRequired,
};

SkillsSummary.defaultProps = {};

export default SkillsSummary;

export const querySkillsSummary = graphql`
  query QUERY_SKILLS_SUMARY {
    allImages: allFile(filter: { relativePath: { regex: "/pages/skills-explorer/" } }) {
      nodes {
        ...LocalFileFragment
      }
    }
    skillsContent: allContentfulSkillsExplorer {
      nodes {
        title
        foregroundColor
        backgroundColor
        jobs {
          ...JobFields
        }
        people {
          ...PersonFields
        }
        metadata {
          tags {
            contentful_id
            name
          }
        }
        skillsPoints {
          skillPointTitle
          cardDescription {
            cardDescription
          }
        }
      }
    }
  }
`;
