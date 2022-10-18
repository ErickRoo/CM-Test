import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import classNames from 'classnames';
import * as Styles from './resources.module.scss';
import Heading from '../../components/heading';
import MetaTitle from '../../components/meta-title';
import MetaDescription from '../../components/meta-description';
import MetaKeywords from '../../components/meta-keywords';
import teacherPdf from '../../assets/pages/families/resources/ylj-educators-guide.pdf';
import parentPdf from '../../assets/pages/families/resources/ylj-family-guide.pdf';
import ColorBar from '../../components/color-bar';
import GenericPageTitle from '../../components/generic-page-title';
import GenericPageSubhead from '../../components/generic-page-subhead';
import PageDimensions from '../../components/page-dimensions';
import { trackEvent } from '../../utils/track';
import Like from '../../components/like';

function Resources() {
  const pageDimensions = {
    contentType: 'Other pages',
  };

  const trackDownload = (resourceName) => {
    trackEvent('Download teacher resource', 'Content Action', resourceName);
  };

  return (
    <div className={Styles.root}>
      <PageDimensions dimensions={pageDimensions} />
      <MetaTitle title="Career Resources for Parents and Teachers" />
      <MetaDescription description="Downloadable career resources for parents, caregivers, and teachers of adolescents ages 8 to 14." />
      <MetaKeywords keywords="career counseling for teens, career counseling middle school, career lesson plans, career worksheets, student resources careers, career development resources for students, career day ideas, career day lesson plan" />
      <ColorBar />
      <div className={classNames('container', 'container-md', 'container-hpad-md')}>
        <GenericPageTitle>Resources</GenericPageTitle>
        <GenericPageSubhead>Dive deeper.</GenericPageSubhead>
        <p className={Styles.intro}>
          These resources will help you and your child or student make the most of this platform.
        </p>
        <Heading className={Styles.downloadsHeader} level={2}>
          PDF Downloads
        </Heading>
        <div className={Styles.downloads}>
          <div className={Styles.download}>
            <a href={parentPdf} download onClick={() => trackDownload('parents')}>
              <StaticImage
                src="../../assets/pages/families/resources/families-thumb.jpg"
                alt="download"
                layout="constrained"
                className={Styles.downloadImg}
                width={767}
              />
            </a>
            <Heading level={3} className={Styles.downloadTitle}>
              A Family Guide
            </Heading>
            <div className={Styles.downloadText}>
              Filled with thoughtful discussion questions and ideas for further engagement, this guide will help you
              spark conversations about career planning.
            </div>
          </div>
          <div className={Styles.download}>
            <a href={teacherPdf} download onClick={() => trackDownload('teachers')}>
              <StaticImage
                src="../../assets/pages/families/resources/educators-thumb.jpg"
                alt="download"
                layout="constrained"
                className={Styles.downloadImg}
                width={767}
              />
            </a>
            <Heading level={3} className={Styles.downloadTitle}>
              An Educator&#39;s Guide
            </Heading>
            <div className={Styles.downloadText}>
              Expand learning with standards-aligned lesson plans and resources designed to engage students in
              meaningful discussion about career development.
            </div>
          </div>
        </div>
        <Like contentId="Resources" callToAction="Was this resource helpful?" />
      </div>
    </div>
  );
}

export default Resources;
