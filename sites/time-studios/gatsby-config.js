const { getSiteUrl } = require('greenlight-shared/src/utils/get-site-url');
const { GoogleTagManagerEvent } = require('greenlight-shared/src/enums/gtm-event');
const siteConfig = require('./site-config');

const { gtmContainerId, gaPropertyId, pathPrefix } = siteConfig;
module.exports = {
  // see https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/

  pathPrefix: `/${pathPrefix}`,
  siteMetadata: {
    title: 'TIME Studios',
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

        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // Name of the event that is triggered
        // on every Gatsby route change.
        //
        // Defaults to gatsby-route-change
        routeChangeEventName: GoogleTagManagerEvent.PAGE_LOAD,

        defaultDataLayer: () => ({
          pageType: window.pageType,
          referrer: document.referrer,
          search: window.location.search,
          url: document.location.href,
          path: window.location.pathname,
          contentShownOnPlatform: 'own',
          timeTasUserid: false,
          timeUserloginstatus: false,
          timeUsertype: 'anonymous',
          contentSyndicated: false,
        }),
      },
    },

    // We need to load this plugin in order for JW Player
    // to properly send GA data to TIME's main GA property
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [gaPropertyId],
        gtagConfig: {
          send_page_view: false,
        },
      },
    },
  ],
};
