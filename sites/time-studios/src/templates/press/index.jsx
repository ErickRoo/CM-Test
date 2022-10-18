import React from 'react';
import classNames from 'classnames/bind';
import { withGlobalDispatch } from 'greenlight-core';
import Header from '../../components/header';
import Footer from '../../components/footer';
import SectionPressList from '../../components/sections/press-list';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

class Press extends React.Component {
  constructor(props) {
    super(props);

    props.globalDispatch({
      headerShown: true,
    });
  }

  render() {
    const {
      pageContext: {
        page,
        menu,
        press = [],
        pages = [],
        config: {
          footerCopy: { footerCopy },
        },
      },
    } = this.props;

    const pressItems = press.sort((a, b) => (a.date > b.date ? -1 : 1));
    const projectPages = pages.filter((projectPage) => projectPage.type === 'project');

    return (
      <div className={cx('Press')}>
        <Header menu={menu} page={page} />

        <div className={cx('content')}>
          <div className={cx('pressListWrapper')}>
            <SectionPressList items={pressItems} projectPages={projectPages} />
          </div>
        </div>

        <Footer footerCopy={footerCopy} />
      </div>
    );
  }
}

export default withGlobalDispatch(Press);
