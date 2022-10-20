import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './index.module.scss';
import MetaTitle from '../../components/meta-title';
import MetaDescription from '../../components/meta-description';
import MetaKeywords from '../../components/meta-keywords';
import CanonicalUrl from '../../components/canonical-url';
import MetaImage from '../../components/meta-image';
import ColorBar from '../../components/color-bar';
import GenericPageTitle from '../../components/generic-page-title';
import GenericPageSubhead from '../../components/generic-page-subhead';
import PageDimensions from '../../components/page-dimensions';
import PageRichText from '../../components/page-rich-text';
import ContentGrid from '../../components/content-grid';

function Index({ data }) {
  const { page } = data;
  const askInterviews = data.askInterviews.nodes;

  const pageDimensions = {
    contentId: page.id,
    contentType: 'Storyfile',
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
          <GenericPageTitle>{page.title}</GenericPageTitle>
          <GenericPageSubhead>{page.subhead}</GenericPageSubhead>
          <PageRichText body={page.body} headingLevel={3} />
        </div>
        {askInterviews.length > 0 && (
          <ContentGrid
            content={askInterviews}
            headingLevel={2}
            foregroundColor="#ff2630"
            className={Styles.featured}
            showContentType={false}
          />
        )}
      </div>
    </div>
  );
}

Index.propTypes = {
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
      metadata: PropTypes.shape({
        tags: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
          })
        ),
      }),
    }),
    askInterviews: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
};

export const query = graphql`
  query QUERY_ASK_ME_ANYTHING {
    page: contentfulPage(slug: { eq: "ask-me-anything" }) {
      id
      title
      subhead
      ...PageRichTextFields
      metaTitle
      metaDescription
      metaKeywords
      canonicalUrl
    }

    askInterviews: allContentfulAsk(
      filter: { title: { regex: "/^(?!___PLACEHOLDER___)/i" } }
      sort: { fields: publishDate, order: DESC }
    ) {
      ...ContentGridAskFields
    }
  }
`;

export default Index;
