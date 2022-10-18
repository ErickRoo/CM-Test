import React from 'react';
import classNames from 'classnames/bind';
import { withGlobalDispatch } from 'greenlight-core';
import Header from '../../components/header';
import Footer from '../../components/footer';
import SectionHeading from '../../components/sections/heading';
import Markdown from '../../components/markdown';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

class About extends React.Component {
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
        config: {
          footerCopy: { footerCopy },
        },
      },
    } = this.props;
    const {
      content: {
        aboutText: { aboutText },
      },
    } = page;

    return (
      <div className={cx('About')}>
        <Header menu={menu} page={page} />

        <div className={cx('content')}>
          <SectionHeading heading="About" />

          <div className={cx('text')}>
            <Markdown>{aboutText}</Markdown>
          </div>
        </div>

        <Footer footerCopy={footerCopy} />
      </div>
    );
  }
}

export default withGlobalDispatch(About);
