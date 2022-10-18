// The file gatsby-ssr.js lets you alter the content of static HTML files as they are being Server-Side Rendered (SSR) by Gatsby and Node.js.
// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/

import React from 'react';
import { GlobalContextProvider } from 'greenlight-core';

// eslint-disable-next-line no-console
console.log('✨ gatsby-ssr from greenlight-core');

// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};
