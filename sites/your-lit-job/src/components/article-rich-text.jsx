import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import RichText from './rich-text';
import * as Styles from './article-rich-text.module.scss';

function ArticleRichText({ body, headingLevel, className }) {
  return (
    <RichText
      body={body}
      headingLevel={headingLevel}
      className={classNames(Styles.root, className)}
      imageClassName={Styles.image}
    />
  );
}

export const query = graphql`
  fragment ArticleRichTextFields on ContentfulArticle {
    body {
      raw
      references {
        ...RichTextMediaFields
      }
    }
  }

  fragment MultimediaRichTextFields on ContentfulMultimedia {
    body {
      raw
      references {
        ...RichTextMediaFields
      }
    }
  }
`;

ArticleRichText.propTypes = {
  body: PropTypes.shape({}).isRequired,
  headingLevel: PropTypes.number,
  className: PropTypes.string,
};

ArticleRichText.defaultProps = {
  headingLevel: 1,
  className: null,
};

export default ArticleRichText;
