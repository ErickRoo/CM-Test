import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import RichText from './rich-text';
import * as Styles from './industry-rich-text.module.scss';

function IndustryRichText({ body, headingLevel, className }) {
  return <RichText body={body} headingLevel={headingLevel} className={classNames(Styles.root, className)} />;
}

export const query = graphql`
  fragment IndustryRichTextFields on ContentfulIndustry {
    body {
      raw
    }
  }
`;

IndustryRichText.propTypes = {
  body: PropTypes.shape({}).isRequired,
  headingLevel: PropTypes.number,
  className: PropTypes.string,
};

IndustryRichText.defaultProps = {
  headingLevel: 1,
  className: null,
};

export default IndustryRichText;
