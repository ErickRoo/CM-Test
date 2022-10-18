import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './privacy-policy.module.scss';
import Heading from '../components/heading';
import MetaTitle from '../components/meta-title';
import MetaDescription from '../components/meta-description';
import MetaKeywords from '../components/meta-keywords';
import PageRichText from '../components/page-rich-text';
import CanonicalUrl from '../components/canonical-url';
import MetaImage from '../components/meta-image';
import ColorBar from '../components/color-bar';
import GenericPageTitle from '../components/generic-page-title';
import PageDimensions from '../components/page-dimensions';

function PrivacyPolicy({ data }) {
  const { page } = data;

  const pageDimensions = {
    contentId: page.id,
    contentType: 'Other pages',
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
      <div className={classNames('container', 'container-sm', 'container-hpad-md')}>
        <GenericPageTitle>{page.title}</GenericPageTitle>
        {page.subhead && (
          <Heading level={2} className={Styles.subhead}>
            {page.subhead}
          </Heading>
        )}
        <PageRichText body={page.body} headingLevel={3} className={Styles.body} />
      </div>
    </div>
  );
}

PrivacyPolicy.propTypes = {
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
  }).isRequired,
};

export const query = graphql`
  query {
    page: contentfulPage(slug: { eq: "privacy-policy" }) {
      id
      title
      subhead
      ...PageRichTextFields
      metaTitle
      metaDescription
      metaKeywords
      canonicalUrl
      internal {
        type
      }
    }
  }
`;

export default PrivacyPolicy;
