import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as Styles from './meetup-interview.module.scss';

import MetaTitle from '../components/meta-title';
import MetaDescription from '../components/meta-description';
import MetaKeywords from '../components/meta-keywords';
import CanonicalUrl from '../components/canonical-url';
import MetaImage from '../components/meta-image';
import ColorBar from '../components/color-bar';
import GenericPageTitle from '../components/generic-page-title';
import GenericPageCopy from '../components/generic-page-copy';
import PageDimensions from '../components/page-dimensions';
import ArticleRichText from '../components/article-rich-text';
import VideoPlayer from '../components/video-player';
import ReturnButton from '../components/return-button';
import Button from '../components/button';
import Date from '../components/date';
import ContentActions from '../components/content-actions';

function MeetUpInterview({ data }) {
  const { meetup } = data;

  const pageDimensions = {
    contentId: meetup.id,
  };

  const renderBodyText = () =>
    meetup.body ? (
      <div className={classNames(Styles.body)}>
        <ArticleRichText body={meetup.body} headingLevel={2} />
      </div>
    ) : null;

  const renderBody = () => {
    const commonClass = classNames('image-shadow', 'image-shadow-aqua');

    if (meetup.video) {
      return (
        <>
          <section className={Styles.video}>
            <VideoPlayer mediaId={meetup.video.videoId} className={commonClass} consumable={false} />
          </section>
          {renderBodyText()}
        </>
      );
    }
    if (meetup.formUrl || meetup.meetingLink) {
      const { alt, img } = meetup.primaryImage.media ?? {};
      const JSXTag = meetup.meetingLink ? 'a' : 'div';

      return (
        <section className={Styles.redirect}>
          <JSXTag className={Styles.headerContainer} href={meetup.meetingLink}>
            <GatsbyImage className={commonClass} image={getImage(img)} alt={alt} />
            {meetup.meetingLink && (
              <div className={Styles.buttonWrapper}>
                <Button size="md" type="div" theme="green" width="md">
                  Join
                </Button>
              </div>
            )}
          </JSXTag>
          {renderBodyText()}
          {meetup.formUrl && (
            <div className={Styles.form}>
              <iframe
                title="Meet-form"
                src={meetup.formUrl}
                width="640"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
              >
                Loading…
              </iframe>
            </div>
          )}
        </section>
      );
    }

    return null;
  };

  return (
    <div className={Styles.root}>
      <PageDimensions dimensions={pageDimensions} />
      <MetaTitle title={meetup.metaTitle ? meetup.metaTitle : meetup.title} />
      <MetaDescription description={meetup.metaDescription ? meetup.metaDescription : meetup.description.description} />
      <MetaKeywords keywords={meetup.metaKeywords} />
      <CanonicalUrl url={meetup.canonicalUrl} />
      <MetaImage image={meetup.primaryImage.media.img} />
      <ColorBar />
      <div className={classNames('container', 'container-hpad-md', Styles.container)}>
        <Date className={Styles.date} date={meetup.eventDate} format="writtenDateTime" />
        <GenericPageTitle className={Styles.title}>{meetup.title}</GenericPageTitle>
        <GenericPageCopy className={Styles.copy}>
          <p>{meetup.description.description}</p>
        </GenericPageCopy>
        <ContentActions favorite={meetup.id} className={Styles.contentActions} />
        <ReturnButton text="Back to Meetups" to="/meetups" />
        {renderBody()}
      </div>
    </div>
  );
}

MeetUpInterview.propTypes = {
  data: PropTypes.shape({
    meetup: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.shape({
        description: PropTypes.string,
      }),
      primaryImage: PropTypes.shape({
        media: PropTypes.shape({
          alt: PropTypes.string,
          img: PropTypes.shape({}),
        }),
      }),
      slug: PropTypes.string,
      eventDate: PropTypes.string,
      metaTitle: PropTypes.string,
      metaDescription: PropTypes.string,
      metaKeywords: PropTypes.string,
      canonicalUrl: PropTypes.string,
      formUrl: PropTypes.string,
      meetingLink: PropTypes.string,
      body: PropTypes.shape({
        raw: PropTypes.string,
      }),
      video: PropTypes.shape({
        id: PropTypes.string,
        videoId: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export const query = graphql`
  query MEETUP_INTERVIEW($id: String) {
    meetup: contentfulMeetup(id: { eq: $id }) {
      id
      title
      description {
        description
      }
      primaryImage {
        media {
          alt: title
          img: gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.5)
        }
      }
      slug
      eventDate
      metaTitle
      metaDescription
      metaKeywords
      canonicalUrl
      formUrl
      meetingLink
      body {
        raw
      }
      video {
        ...JwPlayerFields
      }
    }
  }
`;

export default MeetUpInterview;
