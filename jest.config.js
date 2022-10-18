/**
 * jest.config.js
 *
 * Project-wide Jest configurations. Gatsby does not include unit
 * testing by default, but it only takes a few steps to get it working
 * with Jest(their recommended tool). The guide for setting up Jest with
 * Gatsby can be found here: https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/
 *
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

const jestUtilsDir = '<rootDir>/utils/jest';

// The `CI` environment variable is set by GitHub during a workflow run.
const { CI = 'false' } = process.env;

module.exports = {
  // After v27, jest defaults to `node`
  testEnvironment: `jsdom`,

  // A map from regular expressions to paths to transformers.
  transform: {
    // This tells Jest that all js or jsx files need to be transformed
    // using a `utils/jest/jest-preprocess-gatsby.js` file in the project root.
    '^.+\\.[jt]sx?$': `${jestUtilsDir}/jest-preprocess-gatsby.js`,
  },

  // A map from regular expressions to module names or to arrays of module names
  // that allow to stub out resources with a single module
  moduleNameMapper: {
    // For stylesheets, we need to use the package `identity-obj-proxy`
    // to mock style modules.
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,

    // For misc. files, we need to use the `file-mock.js` mock file
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
  },

  // An array of regexp pattern strings that are matched against all test paths,
  // matched tests are skipped.We're telling Jest to skip all tests in `node_modules`,
  // `.cache`, public, and `cypress` directories.
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`, `cypress`],

  // An array of regexp pattern strings that are matched against all source file paths,
  // matched files will skip transformation. We need to include this because Gatsby
  // includes un-transpiled ES6 code, so we need to tell Jest to not transpile any files
  // in the `node_modules` directory EXCEPT for anything in the `node_modules/gatsby` directory.
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`, 'cypress'],

  // A set of global variables that need to be available in all test environments
  globals: {
    // `__PATH_PREFIX__` is usually set by Gatsby and is required for some components
    __PATH_PREFIX__: ``,
  },

  // This option sets the test environment options that will be passed to the testEnvironment
  testEnvironmentOptions: {
    // We need to set testEnvironment `url` to a valid URL, because some DOM APIs such as localStorage are unhappy
    // with the default(about: blank).
    url: 'http://localhost',
  },

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: [`${jestUtilsDir}/jest-setup-loadershim.js`],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: [`${jestUtilsDir}/jest-setup-test-env.js`],

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: CI === 'true',

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
};
