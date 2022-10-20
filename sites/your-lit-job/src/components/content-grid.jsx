import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import * as Styles from './content-grid.module.scss';

// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import ContentPreviewColumn from './content-preview-column';
import Heading from './heading';
import { trackEvent } from '../utils/track';

function ContentGrid({
  headingLevel,
  title,
  foregroundColor,
  backgroundColor,
  content,
  className,
  showContentType,
  showFavorite,
}) {
  return (
    <div className={classNames(Styles.root, className)} style={{ background: backgroundColor }}>
      {title && (
        <Heading
          level={headingLevel}
          className={classNames(Styles.title, backgroundColor && Styles.title__withBackground)}
        >
          {title}
        </Heading>
      )}
      <div className={Styles.contents}>
        {content.map((contentItem) => {
          return (
            <ContentPreviewColumn
              content={contentItem}
              className={Styles.content}
              key={contentItem.id}
              headingLevel={headingLevel + 1}
              foregroundColor={foregroundColor}
              showContentType={showContentType}
              showFavorite={showFavorite}
              onContentClick={() => {
                let contentType;

                switch (contentItem.internal.type) {
                  case 'ContentfulArticle':
                    contentType = 'Article';
                    break;

                  case 'ContentfulAsk':
                    contentType = 'AMA';
                    break;

                  default:
                    contentType = false;
                    break;
                }

                if (contentType) {
                  trackEvent('Feature Content Unit Clicked', 'Content Action', contentType);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

ContentGrid.propTypes = {
  headingLevel: PropTypes.number,
  title: PropTypes.string,
  foregroundColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  className: PropTypes.string,
  showFavorite: PropTypes.bool,
  showContentType: PropTypes.bool,
};

ContentGrid.defaultProps = {
  headingLevel: 0,
  title: null,
  foregroundColor: '#fff',
  backgroundColor: null,
  content: [],
  className: null,
  showFavorite: true,
  showContentType: true,
};

export const query = graphql`
  fragment ContentGridArticleFields on ContentfulArticleConnection {
    nodes {
      ...ContentPreviewColumnArticleFields
    }
  }
  fragment ContentGridMultimediaFields on ContentfulMultimediaConnection {
    nodes {
      ...ContentPreviewColumnMultimediaFields
    }
  }
  fragment ContentGridAskFields on ContentfulAskConnection {
    nodes {
      ...ContentPreviewColumnAskFields
    }
  }
  fragment ContentGridMeetupFields on ContentfulMeetupConnection {
    nodes {
      ...ContentPreviewColumnMeetupFields
    }
  }
`;

export default ContentGrid;
