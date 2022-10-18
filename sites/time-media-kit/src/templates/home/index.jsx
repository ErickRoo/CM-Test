import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getImage } from 'gatsby-plugin-image';
import NavMobile from '../../components/nav-mobile';
import ContentBody from '../../layout/content-body';
import Footer from '../../layout/footer';

const getFeaturedImageSrc = (featuredImage) => {
  const { images: { fallback: { src: featuredImageSrc = '' } = {} } = {} } = getImage(featuredImage) ?? {};
  return featuredImageSrc;
};

function Index({ pageContext }) {
  const { metadata, nav } = pageContext;

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'Loaded A Page' });
  }, []);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <link rel="canonical" href={metadata.url} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={metadata.title} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={getFeaturedImageSrc(metadata.featuredImage)} />
      </Helmet>
      <NavMobile items={nav} />
      <ContentBody pageContext={pageContext} />
      <Footer />
    </>
  );
}

export default Index;
