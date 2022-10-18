import React from 'react';
import { Helmet } from 'react-helmet';
import { getImage } from 'gatsby-plugin-image';

const getFeaturedImageSrc = (featuredImage) => {
  const { images: { fallback: { src: featuredImageSrc = '' } = {} } = {} } = getImage(featuredImage) ?? {};
  return featuredImageSrc;
};

const getStructuredData = (pageContext = {}, projectPages = []) => {
  const {
    page: { type, content: pageContent, metadata: { title = '', featuredImage = {} } = {}, slug } = {},
    config: { siteUrl = '' } = {},
  } = pageContext;
  const featuredImageSrc = getFeaturedImageSrc(featuredImage);

  const generateSchemaObject = (schemaType = 'WebPage', data = {}) => ({
    '@context': 'http://schema.org',
    '@type': schemaType,
    name: title,
    image: featuredImageSrc,
    ...data,
  });

  let schemaData = generateSchemaObject();

  // project pages
  if (type === 'project') {
    const {
      project: { titleLong },
    } = pageContent;
    schemaData = generateSchemaObject('CreativeWork', {
      name: titleLong,
      author: 'TIME Studios',
    });
  }

  // work page
  if (type === 'work') {
    schemaData = generateSchemaObject('ItemList', {
      itemListOrder: 'ItemListOrderAscending',
      numberOfItems: projectPages.length,
      itemListElement: projectPages.map((projectPage, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'CreativeWork',
          name: projectPage.content.project.titleLong,
          author: 'TIME Studios',
          url: `${siteUrl}/${projectPage.slug}`,
        },
      })),
    });
  }

  // team page
  if (type === 'team') {
    const {
      teamMembers: { people = [] },
    } = pageContent;

    schemaData = generateSchemaObject('ItemList', {
      author: 'TIME Studios',
      itemListOrder: 'ItemListOrderAscending',
      numberOfItems: people.length,
      itemListElement: people.map((person, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Person',
          name: person.fullName,
          jobTitle: person.title || '',
          url: `${siteUrl}/${slug}`,
        },
      })),
    });
  }

  // press page
  if (type === 'press') {
    const { press = [] } = pageContext;

    schemaData = generateSchemaObject('ItemList', {
      author: 'TIME Studios',
      itemListOrder: 'ItemListOrderAscending',
      numberOfItems: press.length,
      itemListElement: press.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Article',
          headline: escape(item.headline),
          datePublished: item.date,
          publication: item.publication,
          url: item.link,
        },
      })),
    });
  }

  return JSON.stringify(schemaData);
};

function Shell({ pageContext, children }) {
  const {
    page: currentPage = {},
    pages = [],
    config: { siteName = '', siteUrl = '', miscConfig: { twitterName = '' } = {} } = {},
  } = pageContext;

  const { metadata: { title = '', description = '', featuredImage = {} } = {}, slug } = currentPage;
  const currentUrl = slug ? `${siteUrl}/${currentPage.slug}` : siteUrl;
  const featuredImageSrc = getFeaturedImageSrc(featuredImage);
  const projectPages = pages.filter((p) => p.type === 'project');

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={currentUrl} />

        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:description" content={description} />

        {featuredImageSrc ? <meta property="og:image" content={featuredImageSrc} /> : null}

        {featuredImageSrc ? <meta name="pinterest:media" content={featuredImageSrc} /> : null}

        <meta name="pinterest:url" content={currentUrl} />
        <meta name="pinterest:description" content={description} />

        {featuredImageSrc ? <meta name="twitter:card" content="summary_large_image" /> : null}

        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:site" content={`@${twitterName}`} />
        <script type="application/ld+json">{getStructuredData(pageContext, projectPages)}</script>
      </Helmet>
      {children}
    </div>
  );
}

export default Shell;
