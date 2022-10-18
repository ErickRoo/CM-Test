import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import classNames from 'classnames';
import * as Styles from './more-content.module.scss';
import Heading from './heading';
import ContentPreviewRow from './content-preview-row';

function MoreContent({ headingLevel, content, className, title }) {
  const industriesQuery = useStaticQuery(graphql`
    query {
      allIndustries: allContentfulIndustry(filter: { title: { regex: "/^(?!___PLACEHOLDER___)/i" } }) {
        nodes {
          id
          title
          metadata {
            tags {
              id
              name
            }
          }
          headerImage {
            alt
            media {
              image: gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  `);

  const arrIndustry = industriesQuery.allIndustries.nodes;

  const selectIndustryData = (industry) => {
    const filterIndustries = [...arrIndustry].find((e) => {
      return e.metadata.tags[0].name === industry;
    });
    return filterIndustries;
  };

  return (
    <div className={classNames(Styles.root, className)}>
      <Heading level={headingLevel} className={Styles.title}>
        {title}
      </Heading>
      <div className={Styles.maContainer}>
        {content.map((row) => {
          row.industryData = selectIndustryData(row.industry);
          return (
            <div className={Styles.content} key={row.id}>
              <ContentPreviewRow content={row} headingLevel={headingLevel + 1} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

MoreContent.propTypes = {
  headingLevel: PropTypes.number,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  className: PropTypes.string,
  title: PropTypes.string,
};

MoreContent.defaultProps = {
  headingLevel: 0,
  content: [],
  className: null,
  title: '',
};

export const query = graphql`
  fragment MoreArticlesFields on ContentfulArticle {
    ...ArticlePreviewRowFields
  }
  fragment MoreMultimediaFields on ContentfulMultimedia {
    ...MultimediaPreviewRowFields
  }
`;

export default MoreContent;
