import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import classNames from 'classnames/bind';
import Image from '../../components/image';
import Modal from '../../components/modal';
import ChevronLeft from '../../components/chevron-left';
import ChevronRight from '../../components/chevron-right';
import AdCategory from '../../components/ad-category';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function AdSection({ content }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const { categories } = content;
  const allItems = categories.reduce((items, category) => {
    return [...items, ...category.items];
  }, []);

  // store active item index in ref
  const activeItemRef = useRef();
  activeItemRef.current = activeItemIndex;

  // open/close modal
  const setModalStatus = (status) => {
    const { body } = document;

    if (status === 'opened') {
      setModalOpened(true);
      setScrollTop(window.scrollY);
      body.style.top = `${-window.scrollY}px`;
      body.classList.add('disable-scroll');
    } else {
      setModalOpened(false);
      body.style.top = '';
      body.classList.remove('disable-scroll');
      window.scrollTo(window.pageXOffset, scrollTop);
    }
  };

  // given a category index and an item index within that category,
  // return the index of that item in the allItems array
  const getItemIndex = (categoryIndex, itemIndex) => {
    let numPrevItems = 0;

    categories.forEach((category, index) => {
      if (index < categoryIndex) {
        numPrevItems += category.items.length;
      }
    });

    return numPrevItems + itemIndex;
  };

  // navigate to previous item
  const goToPrev = () => {
    setActiveItemIndex(activeItemRef.current === 0 ? allItems.length - 1 : activeItemRef.current - 1);
  };

  // navigate to next item
  const goToNext = () => {
    setActiveItemIndex(activeItemRef.current === allItems.length - 1 ? 0 : activeItemRef.current + 1);
  };

  // render modal content based on item index
  const modalContent = (itemIndex) => {
    if (itemIndex === null) return null;

    const item = allItems[itemIndex];

    return (
      <div className={cx('modalContent')}>
        <Image image={item.icon} />
        <div className={cx('text')}>
          <h3 className={cx('title')}>{item.title}</h3>
          <div className={cx('scrollable')}>
            {item.specsDescription && (
              <div className={cx('specsDescription')}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  allowedElements={['p', 'br', 'a', 'strong', 'table', 'thead', 'th', 'tbody', 'tr', 'td']}
                >
                  {item.specsDescription.specsDescription}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
        <button className={cx('prevBtn')} type="button" onClick={goToPrev}>
          <ChevronLeft width="50" height="50" />
        </button>
        <button className={cx('nextBtn')} type="button" onClick={goToNext}>
          <ChevronRight width="50" height="50" />
        </button>
      </div>
    );
  };

  // arrow key event listeners for navigating
  useEffect(() => {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      }

      if (e.key === 'ArrowRight') {
        goToNext();
      }
    });
  }, [activeItemRef]);

  return (
    <div className={cx('AdSection')}>
      <Modal opened={modalOpened} setModalStatus={setModalStatus}>
        {modalContent(activeItemIndex)}
      </Modal>
      {categories.map((category, categoryIndex) => (
        <AdCategory
          key={category.id}
          category={category}
          categoryIndex={categoryIndex}
          getItemIndex={getItemIndex}
          setActiveItemIndex={setActiveItemIndex}
          setModalStatus={setModalStatus}
        />
      ))}
    </div>
  );
}

export default AdSection;
