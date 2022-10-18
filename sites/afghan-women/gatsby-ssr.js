// The file gatsby-ssr.js lets you alter the content of static HTML files as they are being Server-Side Rendered (SSR) by Gatsby and Node.js.
// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/

import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="onetrust"
      src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
      type="text/javascript"
      data-domain-script="fa2d093b-4f84-4fba-98c5-78d84c26682a"
    />,
  ]);
};
