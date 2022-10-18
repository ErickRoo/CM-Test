// The file gatsby-ssr.js lets you alter the content of static HTML files as they are being Server-Side Rendered (SSR) by Gatsby and Node.js.
// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/

import { initializeStore } from 'greenlight-core';
import siteConfig from './site-config';
import CustomLayout from './src/utils/gatsby/wrapPageElement';

initializeStore(siteConfig.initialState);

// see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/#wrapPageElement
// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = CustomLayout;
