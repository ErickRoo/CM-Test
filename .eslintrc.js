/**
 * eslint configs
 *
 * Gatsby already ships with it's own ESLint config, so we're going to use that.
 * We use the AirBnB eslint configs as the base, then the recommended configs
 * from the `node` and `import` eslint plugins, then the prettier configs.
 * See https://eslint.org/docs/user-guide/configuring/
 */

const path = require('path');

const gatsbyEsLintConfigs = './utils/eslint/gatsby-eslint-configs';
const cypressDirs = ['cypress/**/**.test.js', 'sites/**/cypress/**/**.test.js'];
const packageDirs = [
  './',
  './sites/your-lit-job',
  './sites/time-studios',
  './sites/time-media-kit',
  './sites/afghan-women',
  './packages/greenlight-core',
  './packages/greenlight-shared',
].map((p) => path.join(__dirname, p));

module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': ['warn', { singleQuote: true }],
    'import/no-extraneous-dependencies': [
      'warn',
      {
        packageDir: packageDirs,
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  overrides: [
    // Configs only for Gatsby files
    {
      files: [
        // all test spec files
        'sites/**/*.{js,jsx}',
        'packages/**/*.{js,jsx}',
      ],
      extends: [gatsbyEsLintConfigs],
      rules: {
        // TEMPORARY turning these rules that are meant to be
        // errors to warnings (will be addressed in next linter update)
        'react/prop-types': ['warn'],
        'react/jsx-props-no-spreading': ['error', { exceptions: ['Shell', 'Component'] }],
        'no-param-reassign': [
          'warn',
          {
            // We're ignoring modifications to `state` to support
            // the `createSlice` and `createReducer` functions
            // from the `@reduxjs/toolkit` package.
            ignorePropertyModificationsFor: ['state'],
          },
        ],

        'import/no-unresolved': [
          'error',
          {
            ignore: [
              // We're ignoring the `@reach/router` package because
              // it's not a dependency of the project. but it is used
              // by Gatsby.
              // See https://www.gatsbyjs.com/docs/reach-router-and-gatsby/
              '@reach/router',
            ],
          },
        ],
      },
    },

    // Configs only for Jest test files. Uses the ESLint plugin `eslint-plugin-jest`
    {
      files: [
        // all test spec files
        '**.test.js',

        // all mocks in a __mocks__ directory
        '**/__mocks__/**.js',

        // all the Jest utils files
        'utils/jest/**.js',
      ],
      excludedFiles: cypressDirs,
      env: {
        jest: true,
      },
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: {
        'no-underscore-dangle': ['off'],
      },
    },

    // Configs only for Cypress test files. Uses the ESLint plugin `eslint-plugin-cypress`
    {
      env: {
        'cypress/globals': true,
      },
      extends: ['plugin:cypress/recommended'],
      files: cypressDirs,
    },
  ],
};
