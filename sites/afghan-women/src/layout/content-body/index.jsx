import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import * as styles from './styles.module.scss';
import SingleColumn from '../../components/single-column';
import Pullquote from '../../components/pullquote';
import Diptych from '../../components/diptych';
import SectionOpener from '../../components/section-opener';

const cx = classNames.bind(styles);

function Index({ content }) {
  return (
    <div className={cx('ContentBody')}>
      {content.map((item) => {
        const { section, sectionContent } = item;
        switch (section) {
          case 'single':
            return <SingleColumn content={item} />;
          case 'double':
            return <SectionOpener content={sectionContent} />;
          case 'double-image':
            return <Diptych content={sectionContent} />;
          case 'quote':
            return <Pullquote content={sectionContent} />;
          default:
            break;
        }

        return false;
      })}
    </div>
  );
}

export default Index;

Index.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      section: PropTypes.string.isRequired,
      type: PropTypes.string,
      sectionContent: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};
