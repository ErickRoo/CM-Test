import React from 'react';
import classNames from 'classnames/bind';
import { withGlobalDispatch } from 'greenlight-core';
import Header from '../../components/header';
import Footer from '../../components/footer';
import HeroProject from '../../components/hero-project';
import SectionProjectOpener from '../../components/sections/project-opener';
import SectionProjectImages from '../../components/sections/project-images';
import SectionProjectCredits from '../../components/sections/project-credits';
import SectionProjectRelated from '../../components/sections/project-related';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

class Project extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMounted: false,
    };

    props.globalDispatch({
      headerShown: true,
    });
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({
        isMounted: true,
      });
    }, 0);
  }

  render() {
    const { pageContext } = this.props;
    const { isMounted } = this.state;

    const { project } = pageContext.page.content;
    const { relatedProjects } = pageContext.page.content;
    const relatedProjectPages = [];

    if (relatedProjects) {
      const projectPages = pageContext.pages.filter((page) => {
        return page.type === 'project';
      });

      relatedProjects.forEach((relatedProject) => {
        projectPages.forEach((projectPage) => {
          if (projectPage.content.project.id === relatedProject.id) {
            relatedProjectPages.push(projectPage);
          }
        });
      });
    }

    return (
      <div className={cx('Project')}>
        <Header menu={pageContext.menu} page={pageContext.page} />

        <HeroProject project={project} />

        <div className={cx('content', { mounted: isMounted })}>
          <SectionProjectOpener title={project.titleShort} description={project.descriptionLong.descriptionLong} />

          {project.additionalImages ? <SectionProjectImages images={project.additionalImages} /> : null}

          {project.credits ? <SectionProjectCredits credits={project.credits} /> : null}

          {relatedProjects ? <SectionProjectRelated relatedProjectPages={relatedProjectPages} /> : null}
        </div>

        <Footer footerCopy={pageContext.config.footerCopy.footerCopy} />
      </div>
    );
  }
}

export default withGlobalDispatch(Project);
