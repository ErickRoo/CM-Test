import React from 'react';
import classNames from 'classnames/bind';
import { withGlobalDispatch } from 'greenlight-core';
import Header from '../../components/header';
import Footer from '../../components/footer';
import HeroContact from '../../components/hero-contact';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

class Contact extends React.Component {
  constructor(props) {
    super(props);

    props.globalDispatch({
      headerShown: true,
    });
  }

  render() {
    const {
      pageContext: {
        menu,
        page,
        config: {
          footerCopy: { footerCopy },
        },
      },
    } = this.props;
    const { content } = page;

    return (
      <div className={cx('Contact')}>
        <Header menu={menu} page={page} />

        <HeroContact content={content} />

        <Footer footerCopy={footerCopy} />
      </div>
    );
  }
}

export default withGlobalDispatch(Contact);
