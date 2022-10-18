import React, { useEffect } from 'react';
import { Header, Footer } from 'greenlight-shared';
import { Helmet } from 'react-helmet';
import { ArticleJsonLd } from 'gatsby-plugin-next-seo';
import ContentBody from '../../layout/content-body';
import Hero from '../../layout/hero';
import CreditAndDate from '../../components/credit-and-date';
import Credits from '../../components/credits';

function Index({ pageContext }) {
  const { pageContent } = pageContext;
  const lightBlack = '#0f0d0d';

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'Loaded A Page' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Far From Home</title>
        <link rel="canonical" href="https://time.com/afghan-women-kabul-fall-anniversary/" />
        <meta property="og:title" content="Afghan Women Try to Rebuild Lives in Year After Kabul’s Fall" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Far From Home" />
        <meta property="og:url" content="https://time.com/afghan-women-kabul-fall-anniversary/" />
        <meta property="og:description" content="Stories of eight Afghan women, starting anew" />
        <meta property="og:image" content="https://assets.time.com/afghan-women/social-share.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@TIME" />
        <meta name="twitter:title" content="Afghan Women Try to Rebuild Lives in Year After Kabul’s Fall" />
        <meta name="twitter:description" content="Stories of eight Afghan women, starting anew" />
        <meta name="twitter:image" content="https://assets.time.com/afghan-women/afghan-women-square-grid.jpg" />
      </Helmet>
      <ArticleJsonLd
        url="https://time.com/afghan-women-kabul-fall-anniversary/"
        headline="FAR FROM HOME: One year after the fall of Kabul, Afghan women are attempting to build new lives abroad"
        images={['https://assets.time.com/afghan-women/social-share.png']}
        datePublished="2022-08-11"
        dateModified="2022-08-26"
        authorName="TIME Magazine"
        publisherName="TIME"
        description="One year after the fall of Kabul, Afghan women are attempting to build new lives abroad."
        overrides={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://time.com/afghan-women-kabul-fall-anniversary/',
          },
          author: {
            '@type': 'Organization',
            name: 'TIME Magazine',
            url: 'https://www.TIME.com',
          },
          publisher: {
            '@type': 'Organization',
            logo: {
              '@type': 'ImageObject',
              url: 'https://time.com/img/time_logo.png',
            },
          },
        }}
      />
      <Header backgroundColor={lightBlack} />
      <Hero />
      <CreditAndDate />
      <ContentBody content={pageContent} />
      <Credits />
      <Footer backgroundColor={lightBlack} />
    </>
  );
}

export default Index;
