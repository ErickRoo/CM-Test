const { getSiteUrl } = require('greenlight-shared/src/utils/get-site-url');
const siteConfig = require('./site-config');

const { gtmContainerId, pathPrefix } = siteConfig;

module.exports = {
  // see https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/

  pathPrefix: `/${pathPrefix}`,
  siteMetadata: {
    title: 'TIME Media Kit',
    siteUrl: getSiteUrl(),
  },
  plugins: [
    {
      resolve: 'greenlight-core',
      options: {
        ...siteConfig,
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: gtmContainerId,
        includeInDevelopment: false,
      },
    },
  ],
};
