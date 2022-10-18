const initQuestionList = (questionList) => {
  return questionList.map((oneQuestion, index) => ({
    ...oneQuestion,
    value: 0,
    show: index <= 0,
    showing: false,
  }));
};

const updateQuestionList = (questionList, qid, answer) => {
  const newQuestionList = [...questionList];
  let position = qid.replace('question-', '');
  position = Number(position) - 1;

  newQuestionList[position].value = answer;
  if (answer > 0 && questionList.length > position + 1) {
    newQuestionList[position + 1].show = true;
  }
  return {
    newQuestionList,
    position,
  };
};

const getMaxHeightQuestionCard = (_reference) => {
  if (!_reference?.current) {
    return 500;
  }
  const allHeights = Array.from(_reference.current.children)
    .filter(({ id }) => id.indexOf('question-') >= 0)
    .map(({ offsetHeight }) => offsetHeight)
    .sort((a, b) => b - a);

  return allHeights[0] - 50;
};

const getOffsetsScreen = (reference, aditionalTop = 0, aditionalButton = 0) => {
  const top = (window.innerWidth > 768 ? 260 : 200) + aditionalTop;
  const bottom = (window.innerWidth > 768 ? 0 : 80) + aditionalButton;
  const maxItemHeight = getMaxHeightQuestionCard(reference);
  const winHeight = window.innerHeight;
  const safeZone = winHeight - top - bottom;
  const diffZone = safeZone - maxItemHeight;
  const balance = diffZone / 2;

  const prevTopOffset = top + balance;
  const topOffset = winHeight < 975 ? prevTopOffset : 410;
  const prevBottomOffset = bottom + balance;
  const bottomOffset = winHeight < 975 ? prevBottomOffset : prevBottomOffset + (prevTopOffset - 410);

  return [topOffset, bottomOffset];
};

const getMarginsScreen = (reference) => {
  const [top, bottom] = getOffsetsScreen(reference, 0);
  return `${-top}px 0px ${-bottom}px 0px`;
};

const getOffsetQuestionCard = (reference, cardId) => {
  if (!reference?.current) {
    return window.scrollY;
  }

  const foundCard = Array.from(reference?.current.children).find(({ id }) => id?.indexOf(`question-${cardId}`) >= 0);
  if (!foundCard) {
    return window.scrollY;
  }

  const headerOffset = window.innerWidth > 768 ? 160 : 50;
  const [topOffset] = getOffsetsScreen(reference);

  return headerOffset - topOffset + foundCard.offsetTop;
};

const scrollToNextQuestionCard = (questionList, reference, position) => {
  let scrollPosition = window.scrollY;
  const max = questionList.length;

  if (position + 1 < max && questionList[position].value > 0 && questionList[position + 1].value <= 0) {
    scrollPosition = getOffsetQuestionCard(reference, position + 2);
  } else if (position + 1 === max) {
    scrollPosition = getOffsetQuestionCard(reference, 'final') + 100;
  }
  window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
};

const getScoresFrQuestions = (questionList, defaultSkills) => {
  const categories = { ...defaultSkills };
  questionList.forEach(({ category, value }) => {
    categories[category] = {
      value: categories[category].value + value,
    };
  });

  return categories;
};

const getAllQuestionCardsFrReference = (reference, max) => {
  const allCards = Array.from(reference.current.children)
    .filter((_, index) => max > index)
    .filter(({ id }) => id.indexOf('question-') >= 0)
    .map(({ id, offsetTop, offsetHeight }) => {
      let bottom = offsetTop;
      if (window.innerHeight < 975) bottom += offsetHeight;
      else if (window.innerHeight <= 1200) bottom += offsetHeight / 2;
      else if (window.innerHeight <= 1440) bottom += offsetHeight / 4;

      return {
        id,
        pos: Number(id.replace('question-', '')),
        top: offsetTop,
        bottom,
      };
    });
  return allCards;
};

const getNearPositionQuestionCard = (_cards, _questionList, scrollRef, prop) => {
  const cards = [..._cards];
  const otherCards = cards
    .filter((_, index) => _questionList[index].show)
    .map((item) => ({ ...item, diff: Math.abs(scrollRef - item[prop]) }))
    .sort((a, b) => a.diff - b.diff);

  return otherCards[0].pos;
};

const checkQuestionResults = (questionList, max) => {
  let allOne = 0;
  let allFive = 0;
  let text = '';

  questionList.forEach(({ value }) => {
    if (value === 1) allOne += 1;
    else if (value === 5) allFive += 1;
  });

  if (max === allOne) {
    text = `All your answers were "Definitely not me." \nDo you agree with that?`;
  } else if (max === allFive) {
    text = `All your answers were "Totally me." \nDo you agree with that?`;
  }
  return text;
};

export {
  initQuestionList,
  updateQuestionList,
  getMarginsScreen,
  getOffsetQuestionCard,
  scrollToNextQuestionCard,
  getScoresFrQuestions,
  getAllQuestionCardsFrReference,
  getNearPositionQuestionCard,
  checkQuestionResults,
};
