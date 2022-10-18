// The file gatsby-ssr.js lets you alter the content of static HTML files as they are being Server-Side Rendered (SSR) by Gatsby and Node.js.
// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/

import React from 'react';
import Layout from './src/components/layout';
import { AuthProvider } from './src/contexts/AuthContext';
import { SiteProvider } from './src/contexts/SiteContext';

/**
 * A Gatsby SSR API that lets you wrap the root element of your site and
 * can be useful to set up any Provider components.
 *
 * See https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/#wrapRootElement
 */
export const wrapRootElement = ({ element }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <SiteProvider>
    <AuthProvider>{element}</AuthProvider>
  </SiteProvider>
);

/**
 * A Gatsby SSR API that wrap each page element. This is useful for
 * setting wrapper components around pages that won’t get unmounted
 * on page changes.
 *
 * See gatsbyjs.com/docs/reference/config-files/gatsby-ssr/#wrapPageElement
 */
export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>;

const lyticsScript = `
!function(){"use strict";var o=window.jstag||(window.jstag={}),r=[];function n(e){o[e]=function(){for(var n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];r.push([e,t])}}n("send"),n("mock"),n("identify"),n("pageView"),n("unblock"),n("getid"),n("setid"),n("loadEntity"),n("getEntity"),n("on"),n("once"),n("call"),o.loadScript=function(n,t,i){var e=document.createElement("script");e.async=!0,e.src=n,e.onload=t,e.onerror=i;var o=document.getElementsByTagName("script")[0],r=o&&o.parentNode||document.head||document.body,c=o||r.lastChild;return null!=c?r.insertBefore(e,c):r.appendChild(e),this},o.init=function n(t){return this.config=t,this.loadScript(t.src,function(){if(o.init===n)throw new Error("Load error!");o.init(o.config),function(){for(var n=0;n<r.length;n++){var t=r[n][0],i=r[n][1];o[t].apply(o,i)}r=void 0}()}),this}}();
// Define config and initialize Lytics tracking tag.
// - The setup below will disable the automatic sending of Page Analysis Information (to prevent duplicative sends, as this same information will be included in the jstag.pageView() call below, by default)
jstag.init({
  src: '${process.env.GATSBY_YLJ_LYTICS_TAG_SRC}',
  pageAnalysis: {
    dataLayerPull: {
      disabled: true
    }
  }
});

// You may need to send a page view, depending on your use-case
jstag.pageView();
`;

export const onRenderBody = ({ setPostBodyComponents }) => {
  return setPostBodyComponents([
    // eslint-disable-next-line react/no-danger
    <script key="lytics-integration" dangerouslySetInnerHTML={{ __html: lyticsScript }} />,
  ]);
};
