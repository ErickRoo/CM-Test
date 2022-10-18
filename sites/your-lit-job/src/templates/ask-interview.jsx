import React, { useEffect, useRef, useState } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useWindowSize } from '@react-hook/window-size';
import * as Styles from './ask-interview.module.scss';

import MetaTitle from '../components/meta-title';
import MetaDescription from '../components/meta-description';
import MetaKeywords from '../components/meta-keywords';
import CanonicalUrl from '../components/canonical-url';
import MetaImage from '../components/meta-image';
import ColorBar from '../components/color-bar';
import GenericPageTitle from '../components/generic-page-title';
import PageDimensions from '../components/page-dimensions';
import { filterTagsByParent, stripTagParents } from '../utils/tag';
import Like from '../components/like';
import breakpoints from '../utils/breakpoints';
import { useAuth } from '../contexts/AuthContext';
import MoreContent from '../components/more-content';
import AskBadgeProgress from '../components/ask-badge-progress';
import ReturnButton from '../components/return-button';
import ContentActions from '../components/content-actions';

function AskInterview({ data, pageContext }) {
  const { ask } = data;
  const player = useRef();
  const windowSize = useWindowSize();
  const { setConsumedContent, isSignedIn } = useAuth();
  const [storyfileSized, setStoryfileSize] = useState(false);
  const skills = filterTagsByParent(ask.metadata.tags, ['skill']);

  useEffect(() => {
    let windowHeight = window.innerHeight - 30 - 30;

    if (window.matchMedia(breakpoints.sm).matches) {
      windowHeight -= 120;
    }

    player.current.style.height = `${windowHeight}px`;

    setStoryfileSize(true);
  }, [windowSize]);

  const pageDimensions = {
    contentId: ask.id,
    industry: ask.metadata.tags
      ? filterTagsByParent(ask.metadata.tags, ['industry'])
          .map((industry) => stripTagParents(industry.name))
          .join('|')
      : null,
    skill: skills ? skills.map((skill) => stripTagParents(skill.name)).join('|') : null,
    publishDate: ask.publishDate,
    contentType: 'Storyfile',
  };

  // Track consumption
  useEffect(() => {
    if (isSignedIn) {
      setConsumedContent(ask.id);
    }
  }, [isSignedIn]);

  let moreContent = [];

  if (pageContext.relatedContent) {
    moreContent = pageContext.relatedContent.map((id, idx) => {
      const obj = data.moreContent.nodes.find((moreArticle) => moreArticle.id === id);
      obj.industry = pageContext.relatedIndustry[idx];
      return obj;
    });
  } else if (data.moreContent.nodes) {
    moreContent = data.moreContent.nodes;
  }

  return (
    <div className={Styles.root}>
      <PageDimensions dimensions={pageDimensions} />
      <MetaTitle title={ask.metaTitle ? ask.metaTitle : ask.title} />
      <MetaDescription description={ask.metaDescription ? ask.metaDescription : ask.description.description} />
      <MetaKeywords keywords={ask.metaKeywords} />
      <CanonicalUrl url={ask.canonicalUrl} />
      <MetaImage image={ask.primaryImage.media.image} />
      <AskBadgeProgress ask={ask} />
      <ColorBar />
      <div className={classNames('container', 'container-hpad-md', Styles.container)}>
        <div className={Styles.copy}>
          <GenericPageTitle>{ask.title}</GenericPageTitle>
          <p className={classNames(Styles.description, 'container', 'container-sm')}>{ask.description.description}</p>
        </div>
        <ContentActions favorite={ask.id} className={Styles.contentActions} />
        <ReturnButton text="Back to Ask Me Anything library" to="/ask-me-anything" />
        <div className={Styles.player} ref={player}>
          <iframe src={ask.url} className={Styles.storyFile} title={ask.title} allow="microphone" />
        </div>
        <Like callToAction="Do you now know more about this job?" contentId={ask.id} />
      </div>
      {storyfileSized && (
        <aside className={Styles.moreContent}>
          <div className={classNames('container', 'container-hpad-md')}>
            <div className={classNames('container')}>
              <MoreContent headingLevel={2} content={moreContent} title="Ready for more? Check out..." />
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

AskInterview.propTypes = {
  data: PropTypes.shape({
    ask: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.shape({
        description: PropTypes.string,
      }),
      primaryImage: PropTypes.shape({
        media: PropTypes.shape({
          image: PropTypes.shape({}),
        }),
      }),
      publishDate: PropTypes.string,
      metadata: PropTypes.shape({
        tags: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
          })
        ),
      }),
      url: PropTypes.string,
      metaTitle: PropTypes.string,
      metaDescription: PropTypes.string,
      metaKeywords: PropTypes.string,
      canonicalUrl: PropTypes.string,
    }),
    moreContent: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    relatedContent: PropTypes.arrayOf(PropTypes.string),
    relatedIndustry: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export const query = graphql`
  query ASK_INTERVIEW($id: String, $relatedContent: [String]) {
    ask: contentfulAsk(id: { eq: $id }) {
      id
      title
      description {
        description
      }
      primaryImage {
        media {
          image: gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.5)
        }
      }
      url
      publishDate
      metadata {
        tags {
          id
          name
          contentful_id
        }
      }
      metaTitle
      metaDescription
      metaKeywords
      canonicalUrl
      internal {
        type
      }
    }
    moreContent: allContentfulEntry(limit: 3, filter: { id: { in: $relatedContent, ne: $id } }) {
      nodes {
        ...MoreMultimediaFields
        ...MoreArticlesFields
      }
    }
  }
`;

export default AskInterview;
