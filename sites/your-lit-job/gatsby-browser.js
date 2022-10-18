// The file gatsby-browser.js lets you respond to Gatsby-specific events within the browser, and wrap your page components in additional global components.
// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/

// global css
import './src/styles/main.scss';

import React from 'react';
import Layout from './src/components/layout';
import { setPageDimensions } from './src/utils/track';
import { AuthProvider } from './src/contexts/AuthContext';
import { SiteProvider } from './src/contexts/SiteContext';

/**
 * A Gatsby Browser API that lets you wrap the root element of your site and
 * can be useful to set up any Provider components.
 *
 * See https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapRootElement
 */
export const wrapRootElement = ({ element }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <SiteProvider>
    <AuthProvider>{element}</AuthProvider>
  </SiteProvider>
);

/**
 * A Gatsby Browser API that wrap each page element. This is useful for
 * setting wrapper components around pages that won’t get unmounted
 * on page changes.
 *
 * See gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapPageElement
 */
export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>;

/**
 * Called when the user changes routes, including on the initial load of the app
 *
 * See https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#onRouteUpdate
 */
export const onRouteUpdate = () => {
  setPageDimensions();
};
