import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { graphql, navigate } from 'gatsby';
import * as Styles from './index.module.scss';
import MetaTitle from '../../components/meta-title';
import MetaDescription from '../../components/meta-description';
import MetaKeywords from '../../components/meta-keywords';
import MetaImage from '../../components/meta-image';
import PageDimensions from '../../components/page-dimensions';
import ColorBar from '../../components/color-bar';
import SkillsHeader from '../../components/sections/SkillsHeader';
import SkillsBody from '../../components/sections/SkillsBody';
import RequireUser from '../../components/require-user';
import { useAuth } from '../../contexts/AuthContext';
import IsUser from '../../components/is-user';

const mainQuestions = [
  {
    text: `I’d enjoy learning how to fix a bike or skateboard.`,
    category: `realistic`,
  },
  {
    text: `I like to put things together (like Lego kits).`,
    category: `realistic`,
  },
  {
    text: `I like to be outdoors.`,
    category: `realistic`,
  },
  {
    text: `I like taking care of animals.`,
    category: `realistic`,
  },
  {
    text: `I'm good at figuring out how things work.`,
    category: `realistic`,
  },
  {
    text: `I like to cook.`,
    category: `realistic`,
  },

  {
    text: `I like doing science experiments.`,
    category: `investigative`,
  },
  {
    text: `I like solving complex math problems.`,
    category: `investigative`,
  },
  {
    text: `I like dreaming up new inventions.`,
    category: `investigative`,
  },
  {
    text: `I'm a curious person by nature.`,
    category: `investigative`,
  },
  {
    text: `I'm good with computers.`,
    category: `investigative`,
  },
  {
    text: `I like to be challenged.`,
    category: `investigative`,
  },

  {
    text: `I would enjoy designing my own clothes.`,
    category: `artistic`,
  },
  {
    text: `I enjoy sketching, drawing, or painting.`,
    category: `artistic`,
  },
  {
    text: `I like to take pictures of everything.`,
    category: `artistic`,
  },
  {
    text: `I like to sing or play an instrument.`,
    category: `artistic`,
  },
  {
    text: `I like writing stories or poems.`,
    category: `artistic`,
  },
  {
    text: `I like to use my imagination.`,
    category: `artistic`,
  },

  {
    text: `I like tutoring or teaching others.`,
    category: `social`,
  },
  {
    text: `I like volunteering at school and in my community.`,
    category: `social`,
  },
  {
    text: `I like talking in front of people.`,
    category: `social`,
  },
  {
    text: `I enjoy leading discussions.`,
    category: `social`,
  },
  {
    text: `I like making new friends.`,
    category: `social`,
  },
  {
    text: `I like trying to help people solve their problems.`,
    category: `social`,
  },

  {
    text: `I like selling things.`,
    category: `enterprising`,
  },
  {
    text: `I dream of owning a small business.`,
    category: `enterprising`,
  },
  {
    text: `I like competing at school or sports.`,
    category: `enterprising`,
  },
  {
    text: `I finish the projects I start.`,
    category: `enterprising`,
  },
  {
    text: `I like learning about money.`,
    category: `enterprising`,
  },
  {
    text: `I like setting goals for myself.`,
    category: `enterprising`,
  },

  {
    text: `I like things organized and clean.`,
    category: `conventional`,
  },
  {
    text: `I am detail-oriented.`,
    category: `conventional`,
  },
  {
    text: `I like having clear instructions to follow.`,
    category: `conventional`,
  },
  {
    text: `I like keeping lists.`,
    category: `conventional`,
  },
  {
    text: `I am a rule-follower.`,
    category: `conventional`,
  },
  {
    text: `I like working on the computer.`,
    category: `conventional`,
  },
];

const genRandomListQuestions = (_questions) => {
  const genRandomArrNumber = (length) => {
    const list = new Array(length).fill(0).map((_, index) => index);
    let tmp;
    let current;
    let top = length;

    if (length > 0) {
      while (top) {
        top -= 1;
        current = Math.floor(Math.random() * (top + 1));
        tmp = list[current];
        list[current] = list[top];
        list[top] = tmp;
      }
    }
    return list;
  };

  const randomList = genRandomArrNumber(_questions.length);
  const newQuestionsList = randomList.map((pos) => _questions[pos]);
  return newQuestionsList;
};

function SkillsQuiz({ data }) {
  const { isSignedIn, isLoaded, profile } = useAuth();
  const { completedSkills } = profile;

  useEffect(() => {
    // Intentionally, the dependency is only isLoaded. Do not want to monitor changes to completedSkills.
    if (completedSkills) {
      navigate('/skills-explorer/summary');
    }
  }, [isLoaded]);

  const pageDimensions = {
    contentType: 'Skills explorer',
  };

  return (
    <>
      <RequireUser to="/sign-up">
        <PageDimensions dimensions={pageDimensions} />
      </RequireUser>
      <div className={Styles.root}>
        <MetaTitle title="Career and Skills Assessment for Teens" />
        <MetaDescription description="This research-backed quiz for kids ages 8 to 14 encourages future career-seekers to explore their talents, interests, and passions." />
        <MetaKeywords keywords="career assessment for teens, career quiz for kids, career quiz for teens, career quiz for students, middle school career quiz, career day resources, skills assessment, career counseling for teens" />
        <MetaImage />
        <ColorBar />
        <IsUser>
          {isSignedIn && !completedSkills && (
            <>
              <div className={classNames(Styles.header, Styles.header__wProgressBar)}>
                <SkillsHeader headerImg={data.header} />
              </div>
              <div className={Styles.explorer}>
                <SkillsBody questions={genRandomListQuestions(mainQuestions)} />
              </div>
            </>
          )}
        </IsUser>
      </div>
    </>
  );
}

const LocalFile = PropTypes.shape({
  id: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string,
  gImage: PropTypes.shape({
    gatsbyImageData: PropTypes.shape({}),
  }),
});

SkillsQuiz.propTypes = {
  data: PropTypes.shape({
    header: LocalFile,
  }).isRequired,
};

export default SkillsQuiz;

export const querySkillsQuiz = graphql`
  query QUERY_SKILLS_QUIZ {
    header: file(relativePath: { regex: "/pages/skills-explorer/header-background/" }) {
      ...LocalFileFragment
    }
  }
`;

export const querySkillsExplorer = graphql`
  fragment LocalFileFragment on File {
    id
    alt: name
    path: relativePath
    src: publicURL
    gImage: childImageSharp {
      gatsbyImageData(quality: 100, placeholder: BLURRED)
    }
  }

  fragment LocalFileFragmentWo on File {
    id
    alt: name
    path: relativePath
    src: publicURL
  }
`;
