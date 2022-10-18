import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { trackEvent } from '../../../utils/track';
import {
  initQuestionList,
  updateQuestionList,
  getMarginsScreen,
  getOffsetQuestionCard,
  scrollToNextQuestionCard,
  getScoresFrQuestions,
  getAllQuestionCardsFrReference,
  getNearPositionQuestionCard,
  checkQuestionResults,
} from '../../../utils/questions-list';
import * as Styles from './skills-body.module.scss';

import Question from '../../elements/Question';
import ProgressBar from '../../elements/ProgressBar';
import ModalWarning from '../../elements/ModalWarning';
import SkillsExplorerFinish from '../../elements/SkillsExplorerFinish';
import { getBadgesByTrigger } from '../../../utils/badges';
import { useAuth } from '../../../contexts/AuthContext';
import { useSite } from '../../../contexts/SiteContext';
import { sortSkills, getDefaultSkills } from '../../../utils/skill';

function SkillsBody({ questions }) {
  const formRef = useRef(null);
  const prevScrollY = useRef(0);
  const { setIndexFeedCache } = useSite();
  const { setSkills, addBadgeProgress, setCompletedSkills, profile } = useAuth();
  const [questionList, setQuestionList] = useState(initQuestionList(questions));
  const [answerCounter, setAnswerCounter] = useState(0);
  const [showModalWarning, setShowModalWarning] = useState({ open: false, text: '', type: 'message' });
  const [marginViewPort, setMarginViewPort] = useState('-10% 0% -10% 0%');
  const [resultShow, setResultShow] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const { skills } = profile;

  const initializeFn = () => {
    window.scrollTo({ top: 0 });
    const marginVP = getMarginsScreen(formRef, -30, -30);
    setMarginViewPort(marginVP);
  };

  const resizeFn = () => {
    window.addEventListener('resize', () => {
      const marginVP = getMarginsScreen(formRef, -30, -30);
      setMarginViewPort(marginVP);
    });
  };

  const scrollEndFn = (allCards, reference, finalShowed) => {
    const heightOffset = window.innerHeight < 975 ? window.innerHeight / 2 : 300;
    const scrollRef = heightOffset + window.scrollY;
    const newQuestionList = [...questionList];
    const oneShowed = newQuestionList.find(({ showing }) => showing);
    const latestBottom = allCards[allCards.length - 1].bottom;

    if (!oneShowed && !scrolling) {
      let scrollPosition = window.scrollY;
      if (!finalShowed || scrollRef < latestBottom) {
        const isUpMove = prevScrollY.current > window.scrollY;
        const isDownMove = prevScrollY.current < window.scrollY;
        if (isUpMove || isDownMove) {
          const nearId = getNearPositionQuestionCard(allCards, newQuestionList, scrollRef, isUpMove ? 'bottom' : 'top');
          scrollPosition = getOffsetQuestionCard(reference, nearId);
        }
      } else if (finalShowed && scrollRef >= latestBottom) {
        scrollPosition = getOffsetQuestionCard(reference, 'final') + 100;
      }
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }

    prevScrollY.current = window.scrollY;
  };

  const updateUserAnswerFn = (qid, answer) => {
    setScrolling(true);
    const { newQuestionList, position } = updateQuestionList(questionList, qid, answer);
    setQuestionList(newQuestionList);

    const listAnswered = newQuestionList.filter(({ value }) => value > 0).length;
    setAnswerCounter(listAnswered);

    const scores = getScoresFrQuestions(newQuestionList, getDefaultSkills());
    setSkills(scores);

    setTimeout(() => {
      setResultShow(position + 1 === questionList.length);
      scrollToNextQuestionCard(newQuestionList, formRef, position);
    }, 1800);
    setTimeout(() => setScrolling(false), 2000);
  };

  const redirectSummaryFn = async () => {
    setCompletedSkills(true);
    setIndexFeedCache([]);

    getBadgesByTrigger('action', 'createSkills').forEach((badge) => {
      addBadgeProgress(badge.id, Date.now());
    });

    trackEvent('Skills Explorer success', 'Skills Explorer', 'skills-explorer-signup-success');

    trackEvent(
      'Top 3 traits',
      'Skills Explorer',
      sortSkills(skills)
        .slice(0, 3)
        .map(({ id }) => id)
        .join(',')
    );

    // @TODO maybe it deosn't necessary because the first redirect at first of Quiz component is exec firstly
    await navigate('/skills-explorer/summary/');
  };

  useEffect(() => {
    initializeFn();
  }, []);

  useEffect(() => {
    resizeFn();
  }, []);

  useEffect(() => {
    let timer;
    const allCards = getAllQuestionCardsFrReference(formRef, questions.length);
    const handleScrollEndFn = () => scrollEndFn(allCards, formRef, resultShow);

    const handleScroll = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(handleScrollEndFn, 100);
    };

    window.addEventListener('scroll', handleScroll, false);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY, formRef, resultShow, scrolling]);

  const handleEmojiSelection = ({ qid, answer }) => updateUserAnswerFn(qid, answer);

  const handleQuestionCardShowed = ({ qid, showing }) => {
    const newQuestionList = [...questionList];
    let position = qid.replace('question-', '');
    position = Number(position) - 1;
    newQuestionList[position].showing = showing;
    setQuestionList(newQuestionList);
  };

  const handleResultsClick = async () => {
    const text = checkQuestionResults(questionList, questions.length);
    if (text.length > 0) {
      setShowModalWarning({ open: true, text, type: 'confirmation' });
    } else {
      await redirectSummaryFn();
    }
  };

  return (
    <section id="body" className={Styles.root}>
      <div className={Styles.container}>
        <section className={Styles.details}>
          <ProgressBar counter={answerCounter} total={questions.length} />
        </section>
        <section className={Styles.survey}>
          <form ref={formRef}>
            {questionList.map((question, index) => {
              const key = `question-${index + 1}`;
              const number = `${(index % 5) + 1}`;

              return (
                <Question
                  key={key}
                  qid={key}
                  text={question.text}
                  show={question.show}
                  onSelect={handleEmojiSelection}
                  onShow={handleQuestionCardShowed}
                  marginViewPort={marginViewPort}
                  typeColor={number}
                />
              );
            })}
            <SkillsExplorerFinish action={handleResultsClick} showCard={resultShow} />
          </form>
        </section>
        <section className={Styles.modal}>
          <ModalWarning
            open={showModalWarning.open}
            close={() => setShowModalWarning({ ...showModalWarning, open: false })}
            action={redirectSummaryFn}
            text={showModalWarning.text}
            type={showModalWarning.type}
          />
        </section>
      </div>
    </section>
  );
}

SkillsBody.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      category: PropTypes.string,
    })
  ).isRequired,
};

SkillsBody.defaultProps = {};

export default SkillsBody;
