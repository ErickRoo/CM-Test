import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './contact.module.scss';
import MetaTitle from '../components/meta-title';
import MetaDescription from '../components/meta-description';
import MetaKeywords from '../components/meta-keywords';
import PageRichText from '../components/page-rich-text';
import CanonicalUrl from '../components/canonical-url';
import MetaImage from '../components/meta-image';
import ColorBar from '../components/color-bar';
import GenericPageTitle from '../components/generic-page-title';
import GenericPageSubhead from '../components/generic-page-subhead';
import PageDimensions from '../components/page-dimensions';

function Contact({ data }) {
  const { page } = data;

  const pageDimensions = {
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
      <div className={Styles.inner}>
        <ColorBar />
        <div className={classNames('container', 'container-sm', 'container-hpad-md', Styles.container)}>
          <GenericPageTitle>{page.title}</GenericPageTitle>
          <GenericPageSubhead>{page.subhead}</GenericPageSubhead>
          <PageRichText body={page.body} headingLevel={3} />
        </div>
      </div>
    </div>
  );
}

Contact.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
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
    page: contentfulPage(slug: { eq: "contact-us" }) {
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

export default Contact;
