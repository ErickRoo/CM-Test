import React from 'react';
import classNames from 'classnames/bind';
import { withGlobalDispatch } from 'greenlight-core';
import Header from '../../components/header';
import Footer from '../../components/footer';
import HeroWork from '../../components/hero-work';
import HeroCarousel from '../../components/hero-carousel';
import SectionProjectsGrid from '../../components/sections/projects-grid';
import ProjectsFilter from '../../components/projects-filter';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

class Work extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFilter: 'all',
    };

    props.globalDispatch({
      headerShown: true,
    });
  }

  onClickFilter = (type) => {
    this.setState({
      currentFilter: type,
    });
  };

  render() {
    const { currentFilter } = this.state;
    const {
      pageContext: {
        page,
        pages,
        menu,
        config: {
          footerCopy: { footerCopy },
        },
      },
    } = this.props;

    // get all project pages and sort by newest
    const projectPages = pages
      .filter((projectPage) => projectPage.type === 'project')
      .sort((a, b) => (a.content.project.publishDate > b.content.project.publishDate ? -1 : 1));

    const featuredProjectPages = projectPages
      .filter((projectPage) => projectPage.content.project.featured)
      .sort((a, b) => {
        return a.content.project.featuredOrder - b.content.project.featuredOrder;
      });

    // build array of project types for filtering
    const projectTypes = [];
    projectPages.forEach((projectPage) => {
      const types = projectPage.content.project.type || [];

      types.forEach((type) => {
        if (!projectTypes.includes(type)) projectTypes.push(type);
      });
    });

    projectTypes.sort();

    const filteredProjectPages = projectPages.filter((projectPage) => {
      if (currentFilter === 'all') return true;
      return projectPage.content.project.type && projectPage.content.project.type.indexOf(currentFilter) !== -1;
    });

    return (
      <div className={cx('Work')}>
        <Header menu={menu} page={page} />
        {featuredProjectPages.length > 1 ? (
          <HeroCarousel featuredProjects={featuredProjectPages} />
        ) : (
          <HeroWork featuredProjectPage={featuredProjectPages[0]} />
        )}
        <div className={cx('content')}>
          {projectTypes.length > 0 ? (
            <ProjectsFilter
              onClickFilter={this.onClickFilter}
              projectTypes={projectTypes}
              currentFilter={currentFilter}
            />
          ) : null}

          <SectionProjectsGrid projectPages={filteredProjectPages} currentFilter={currentFilter} />
        </div>

        <Footer footerCopy={footerCopy} />
      </div>
    );
  }
}

export default withGlobalDispatch(Work);
