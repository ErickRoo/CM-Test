import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import classNames from 'classnames';
import * as Styles from './content-preview-column.module.scss';
import Heading from './heading';
import Tags from './tags';
import { getGatsbyImage } from '../utils/image';
import FavoriteButton from './favorite-button';
import ColorBar from './color-bar';
import Date from './date';
import ContentTypeIcon from './content-type-icon';

const pathSelect = {
  ContentfulArticle: 'articles',
  ContentfulMultimedia: 'articles',
  ContentfulAsk: 'ask-me-anything',
  ContentfulMeetup: 'meetups',
};

const tagsSelect = {
  ContentfulArticle: true,
  ContentfulMultimedia: true,
  ContentfulAsk: true,
  ContentfulMeetup: false,
};

const dateSelect = {
  ContentfulArticle: false,
  ContentfulMultimedia: false,
  ContentfulAsk: false,
  ContentfulMeetup: true,
};

function ContentPreviewColumn({
  content,
  className,
  foregroundColor,
  headingLevel,
  onContentClick,
  showFavorite,
  showContentType,
}) {
  const primaryImage = getGatsbyImage(content.primaryImage);
  const to = `${pathSelect?.[content?.internal?.type] ? `/${pathSelect[content.internal.type]}` : ''}/${content.slug}`;

  return (
    <div className={classNames(Styles.root, className)}>
      {showContentType && <ContentTypeIcon corner size="small" type={content.internal.type} />}
      <Link to={to} onClick={onContentClick}>
        {primaryImage && (
          <GatsbyImage className={Styles.primaryImage} image={primaryImage} alt={content.primaryImage.alt} />
        )}
      </Link>
      <ColorBar color={foregroundColor} />
      <div className={Styles.copyWrapper}>
        <div className={Styles.copy}>
          {tagsSelect[content.internal.type] && <Tags tags={content.metadata.tags} className={Styles.tags} />}
          {dateSelect[content.internal.type] && (
            <Date date={content.eventDate} className={Styles.date} format="writtenDateTime" />
          )}
          <Heading level={headingLevel} className={Styles.title}>
            <Link to={to} onClick={onContentClick}>
              {content.title}
            </Link>
          </Heading>
          {content?.description?.description && (
            <div className={Styles.description}>{content.description.description}</div>
          )}
        </div>
        {showFavorite && (
          <div className={Styles.favorite}>
            <FavoriteButton postId={content.id} />
          </div>
        )}
      </div>
    </div>
  );
}

ContentPreviewColumn.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    slug: PropTypes.string,
    eventDate: PropTypes.string,
    description: PropTypes.shape({
      description: PropTypes.string,
    }),
    metadata: PropTypes.shape({
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        })
      ),
    }),
    primaryImage: PropTypes.shape({
      alt: PropTypes.string,
      media: PropTypes.shape({
        image: PropTypes.shape({}),
      }),
    }),
    internal: PropTypes.shape({
      type: PropTypes.string,
    }),
  }).isRequired,
  foregroundColor: PropTypes.string,
  className: PropTypes.string,
  headingLevel: PropTypes.number,
  onContentClick: PropTypes.func,
  showFavorite: PropTypes.bool,
  showContentType: PropTypes.bool,
};

ContentPreviewColumn.defaultProps = {
  foregroundColor: '#fff',
  className: null,
  headingLevel: 0,
  onContentClick: () => {},
  showFavorite: true,
  showContentType: true,
};

export const query = graphql`
  fragment ContentPreviewColumnArticleFields on ContentfulArticle {
    ...ArticlePreviewPostFields
    internal {
      type
    }
  }
  fragment ContentPreviewColumnMultimediaFields on ContentfulMultimedia {
    ...MultimediaPreviewPostFields
    internal {
      type
    }
  }
  fragment ContentPreviewColumnAskFields on ContentfulAsk {
    ...AskPreviewPostFields
    internal {
      type
    }
  }
  fragment ContentPreviewColumnMeetupFields on ContentfulMeetup {
    ...MeetupPreviewPostFields
    internal {
      type
    }
  }
`;

export default ContentPreviewColumn;
