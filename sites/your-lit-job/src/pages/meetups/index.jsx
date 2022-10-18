import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './index.module.scss';

import PageDimensions from '../../components/page-dimensions';
import MetaTitle from '../../components/meta-title';
import MetaDescription from '../../components/meta-description';
import MetaKeywords from '../../components/meta-keywords';
import CanonicalUrl from '../../components/canonical-url';
import MetaImage from '../../components/meta-image';
import ColorBar from '../../components/color-bar';
import GenericPageTitle from '../../components/generic-page-title';
import GenericPageSubhead from '../../components/generic-page-subhead';
import PageRichText from '../../components/page-rich-text';
import ContentGrid from '../../components/content-grid';
import { filterMeetings } from '../../utils/meet-up';

function MeetUp({ data }) {
  const { page, meetUpInterviews } = data;
  const meetUpInterviewsFiltered = filterMeetings(meetUpInterviews.nodes);

  const pageDimensions = {
    contentId: page.id,
    contentType: 'meetups',
  };

  return (
    <div className={Styles.root}>
      <PageDimensions dimensions={pageDimensions} />
      <MetaTitle title={page.metaTitle ? page.metaTitle : page.title} />
      <MetaDescription description={page.metaDescription} />
      <MetaKeywords keywords={page.metaKeywords} />
      <CanonicalUrl url={page.canonicalUrl} />
      <MetaImage />
      <ColorBar />
      <div className={classNames('container', 'container-hpad-md', Styles.container)}>
        <div className={Styles.copy}>
          <GenericPageTitle>Meetups</GenericPageTitle>
          <GenericPageSubhead>Ut enim ad minim veniam.</GenericPageSubhead>
          <PageRichText body={page.body} headingLevel={3} />
        </div>
        {meetUpInterviewsFiltered.upcoming.length > 0 && (
          <ContentGrid
            content={meetUpInterviewsFiltered.upcoming}
            title="Upcoming Meetups"
            headingLevel={2}
            foregroundColor="#0F9FFF"
            className={Styles.featured}
            showContentType={false}
          />
        )}
        {meetUpInterviewsFiltered.past.length > 0 && (
          <ContentGrid
            content={meetUpInterviewsFiltered.past}
            title="Past Meetups"
            headingLevel={2}
            foregroundColor="#0F9FFF"
            className={Styles.featured}
            showContentType={false}
          />
        )}
      </div>
    </div>
  );
}

MeetUp.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      subhead: PropTypes.string,
      body: PropTypes.shape({}),
      metaTitle: PropTypes.string,
      metaDescription: PropTypes.string,
      metaKeywords: PropTypes.string,
      canonicalUrl: PropTypes.string,
    }),
    meetUpInterviews: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          eventDate: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
};

export const query = graphql`
  query QUERY_MEET_UP {
    page: contentfulPage(slug: { eq: "meetups" }) {
      id
      title
      subhead
      ...PageRichTextFields
      metaTitle
      metaDescription
      metaKeywords
      canonicalUrl
    }

    meetUpInterviews: allContentfulMeetup(
      filter: { title: { regex: "/^(?!___PLACEHOLDER___)/i" } }
      sort: { fields: eventDate, order: DESC }
    ) {
      ...ContentGridMeetupFields
    }
  }
`;

export default MeetUp;
