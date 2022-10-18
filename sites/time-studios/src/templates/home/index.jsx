import React from 'react';
import classNames from 'classnames/bind';
import { withGlobalDispatch } from 'greenlight-core';
import HeroHome from '../../components/hero-home';
import Section from '../../components/section';
import SectionSectionHeadingDek from '../../components/sections/heading-dek';
import SectionHomeFeaturedProject from '../../components/sections/home-featured-project';
import SectionAwardsGrid from '../../components/sections/awards-grid';
import SectionPressList from '../../components/sections/press-list';
import Header from '../../components/header';
import Footer from '../../components/footer';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

class Home extends React.Component {
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
        pages = [],
        press = [],
        config: {
          footerCopy: { footerCopy },
        },
      },
    } = this.props;

    const {
      content: {
        heroHeading,
        awardsImages,
        heroVideoId,
        heroPoster,
        awardsText: { awardsText },
      },
    } = page;
    const pageFiltered = (pageType) => pages.filter((p) => p.type === pageType);
    const projectPages = pageFiltered('project') ?? [];
    const featuredProjectPages = projectPages
      .filter((projectPage) => projectPage.content.project.featured)
      .sort((a, b) => {
        return a.content.project.featuredOrder - b.content.project.featuredOrder;
      });

    const [newestPressItem] = press.sort((a, b) => (a.date > b.date ? -1 : 1));
    return (
      <div className={cx('Home')}>
        <Header menu={menu} page={page} />
        <HeroHome headline={heroHeading} videoId={heroVideoId} poster={heroPoster} />
        <div className={cx('content')}>
          <Section>
            <SectionHomeFeaturedProject featuredProjectPage={featuredProjectPages[0]} workPage={pageFiltered('work')[0]} />
          </Section>

          <Section>
            <div style={{ backgroundColor: '#000' }}>
              <SectionPressList
                items={[newestPressItem]}
                projectPages={projectPages}
                showRubric
                showMoreButton
                pressPage={pageFiltered('press')[0]}
              />
            </div>
          </Section>

          <Section>
            <SectionSectionHeadingDek heading="Awards and Festivals" dek={awardsText} />
            <SectionAwardsGrid images={awardsImages} />
          </Section>
        </div>

        <Footer footerCopy={footerCopy} />
      </div>
    );
  }
}

export default withGlobalDispatch(Home);
