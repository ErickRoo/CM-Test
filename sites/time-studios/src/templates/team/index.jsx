import React from 'react';
import classNames from 'classnames/bind';
import { withGlobalDispatch } from 'greenlight-core';
import Header from '../../components/header';
import Footer from '../../components/footer';
import SectionSectionHeadingDek from '../../components/sections/heading-dek';
import SectionTeamGrid from '../../components/sections/team-grid';
import TeamModal from '../../components/team-modal';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPerson: null,
    };

    props.globalDispatch({
      headerShown: true,
    });
  }

  setCurrentPerson = (person) => {
    this.setState({
      currentPerson: person,
    });

    this.setScrollLock(person !== null);
  };

  static setScrollLock = (locked) => {
    if (typeof window !== 'undefined') {
      if (locked) {
        document.body.classList.add('noscroll');
      } else {
        document.body.classList.remove('noscroll');
      }
    }
  };

  closeModal = () => {
    this.setCurrentPerson(null);
  };

  render() {
    const { pageContext } = this.props;
    const { currentPerson } = this.state;

    const { content } = pageContext.page;

    return (
      <div className={cx('Team')}>
        <Header menu={pageContext.menu} page={pageContext.page} />

        <div className={cx('content')}>
          <SectionSectionHeadingDek heading="Team" dek={content.teamText.teamText} />

          <SectionTeamGrid people={content.teamMembers} setCurrentPerson={this.setCurrentPerson} />
        </div>

        <Footer footerCopy={pageContext.config.footerCopy.footerCopy} />

        <TeamModal person={currentPerson} closeModal={this.closeModal} />
      </div>
    );
  }
}

export default withGlobalDispatch(Team);
