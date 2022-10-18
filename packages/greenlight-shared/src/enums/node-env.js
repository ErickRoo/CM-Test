/**
 * node-env.js
 *
 * List of values for the environment variable `NODE_ENV`:
 * - development
 * - production
 * - test
 */
const NodeEnv = Object.freeze({
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
});

module.exports = {
  NodeEnv,
};
