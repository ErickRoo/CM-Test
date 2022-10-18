import React from 'react';
import PropTypes from 'prop-types';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { graphql } from 'gatsby';
import { BLOCKS } from '@contentful/rich-text-types';
import classNames from 'classnames';
import RichTextMedia from './rich-text-media';
import * as Styles from './rich-text.module.scss';
import Heading from './heading';

export function defaultRichTextOptions(headingLevel, imageClassName) {
  return {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => {
        return <Heading level={headingLevel}>{children}</Heading>;
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const { data } = node;
        const { description, title, source } = data.target;
        return (
          <RichTextMedia
            image={data.target}
            description={description}
            title={title}
            source={source}
            className={imageClassName}
          />
        );
      },
    },
  };
}

function RichText({ body, headingLevel, className, richTextOptions, imageClassName }) {
  const emptyParagraphFix = (copy) => {
    const lastElement = copy[copy.length - 1];

    if (
      lastElement.type === 'p' &&
      lastElement.props.children.length === 1 &&
      (lastElement.props.children[0] === '\n\n\n' || lastElement.props.children[0] === '')
    ) {
      copy.pop();
    }

    return copy;
  };

  return (
    <div className={classNames(Styles.root, className)}>
      {emptyParagraphFix(renderRichText(body, richTextOptions(headingLevel, imageClassName)))}
    </div>
  );
}

RichText.propTypes = {
  body: PropTypes.shape({}).isRequired,
  headingLevel: PropTypes.number,
  className: PropTypes.string,
  richTextOptions: PropTypes.func,
  imageClassName: PropTypes.string,
};

RichText.defaultProps = {
  headingLevel: 1,
  className: null,
  richTextOptions: defaultRichTextOptions,
  imageClassName: null,
};

export const query = graphql`
  fragment RichTextFields on ContentfulArticle {
    body {
      raw
      references {
        ...RichTextMediaFields
      }
    }
  }
`;

export default RichText;
