// The file gatsby-browser.js lets you respond to Gatsby-specific events within the browser, and wrap your page components in additional global components.
// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/

import { initializeStore } from 'greenlight-core';
import siteConfig from './site-config';
import CustomLayout from './src/utils/gatsby/wrapPageElement';

// global css
import './src/styles/main.scss';

initializeStore(siteConfig.initialState);

// see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapPageElement
// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = CustomLayout;
