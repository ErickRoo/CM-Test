/**
 * This Jest preprocess file is based on the recommended configuration from
 * Gatsby's documentation: https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/
 *
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

const babelOptions = {
  presets: ['babel-preset-gatsby', '@babel/preset-typescript'],
};

module.exports = require('babel-jest').default.createTransformer(babelOptions);
