import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BLOCKS } from '@contentful/rich-text-types';
import classNames from 'classnames';
import RichText, { defaultRichTextOptions } from './rich-text';
import * as Styles from './page-rich-text.module.scss';
import Heading from './heading';

// This component is primarily a wrapper for RichText, but adds page-specific (contact us, privacy policy, etc) styling

const textToId = (text) => {
  return text
    .toLowerCase()
    .replace(/\s/gi, '-')
    .replace(/[^a-zA-Z\d-]/gi, '');
};

const richTextOptions = (headingLevel) => {
  const options = defaultRichTextOptions();

  options.renderNode[BLOCKS.HEADING_1] = (node) => {
    const { content } = node;

    return (
      <Heading level={headingLevel} id={textToId(content[0].value)}>
        {content[0].value}
      </Heading>
    );
  };

  return options;
};

function PageRichText({ body, headingLevel, className }) {
  return (
    <RichText
      body={body}
      richTextOptions={richTextOptions}
      headingLevel={headingLevel}
      className={classNames(Styles.root, className)}
    />
  );
}

export const query = graphql`
  fragment PageRichTextFields on ContentfulPage {
    body {
      raw
    }
  }
`;

PageRichText.propTypes = {
  body: PropTypes.shape({}).isRequired,
  headingLevel: PropTypes.number,
  className: PropTypes.string,
};

PageRichText.defaultProps = {
  headingLevel: 1,
  className: null,
};

export default PageRichText;
