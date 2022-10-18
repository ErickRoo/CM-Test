// The file gatsby-browser.js lets you respond to Gatsby-specific events within the browser, and wrap your page components in additional global components.
// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/

import React from 'react';
import { GlobalContextProvider } from 'greenlight-core';

// eslint-disable-next-line no-console
console.log('✨ gatsby-browser from greenlight-core');

// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};
