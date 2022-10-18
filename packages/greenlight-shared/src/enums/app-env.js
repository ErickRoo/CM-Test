/**
 * app-env.js
 *
 * List of environments for the application:
 * - local-development (localhost, or local-dev.time.com or local.time.com)
 * - development (dev.time.com)
 * - qa (qa.time.com, can be considered as staging for now)
 * - production (time.com)
 */
const AppEnv = Object.freeze({
  LOCAL_DEV: 'local-development',
  DEV: 'development',
  QA: 'qa',
  PROD: 'production',
});

module.exports = {
  AppEnv,
};
