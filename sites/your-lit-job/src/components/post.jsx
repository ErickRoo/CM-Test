import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import * as Styles from './post.module.scss';
import ArticlePreviewPost from './article-preview-post';
import MultimediaPreviewPost from './multimedia-preview-post';
import MeetupPreviewPost from './meetup-preview-post';
import AskPreviewPost from './ask-preview-post';
import PostPreviewPost from './post-preview-post';

const PostComponents = {
  ContentfulArticle: ArticlePreviewPost,
  ContentfulMultimedia: MultimediaPreviewPost,
  ContentfulMeetup: MeetupPreviewPost,
  ContentfulAsk: AskPreviewPost,
  ContentfulPost: PostPreviewPost,
};

function Post({ hit, headingLevel, className, ssr }) {
  const PostComponent = PostComponents[hit.internal.type];
  return (
    <div className={classNames(Styles.root, className, 'container container-md')}>
      <PostComponent className={Styles.root} post={hit} headingLevel={headingLevel} ssr={ssr} showFavoriteButton />
    </div>
  );
}

Post.propTypes = {
  hit: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    internal: PropTypes.shape({
      type: PropTypes.string,
    }),
  }).isRequired,
  headingLevel: PropTypes.number,
  className: PropTypes.string,
  ssr: PropTypes.bool,
};

Post.defaultProps = {
  headingLevel: 0,
  className: null,
  ssr: false,
};

export const query = graphql`
  fragment PostAskFields on ContentfulAsk {
    ...AskPreviewPostFields
    internal {
      type
    }
  }
  fragment PostArticleFields on ContentfulArticle {
    ...ArticlePreviewPostFields
    internal {
      type
    }
  }
  fragment PostMultimediaFields on ContentfulMultimedia {
    ...MultimediaPreviewPostFields
    internal {
      type
    }
  }
  fragment PostMeetupFields on ContentfulMeetup {
    ...MeetupPreviewPostFields
    internal {
      type
    }
  }
  fragment PostPostFields on ContentfulPost {
    ...PostPreviewPostFields
    internal {
      type
    }
  }
`;

export default Post;
