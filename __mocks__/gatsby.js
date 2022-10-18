/**
 * Jest Mock File – gatsby.js
 *
 * This Jest mock file, which mocks the `graphql()` function, `Link` component, and
 * `StaticQuery` component. is based on the recommended configuration from
 * Gatsby's documentation: https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/
 *
 * See the jest.config.js file, specifically the `moduleNameMapper`
 * config, for more information.
 */

const React = require('react');

const gatsby = jest.requireActual('gatsby');

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({ activeClassName, activeStyle, getProps, innerRef, partiallyActive, ref, replace, to, ...rest }) =>
      React.createElement('a', {
        ...rest,
        href: to,
      })
  ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn(),
};
