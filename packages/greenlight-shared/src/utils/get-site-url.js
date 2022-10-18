/**
 * get-site-url.js
 *
 * Get the site URL for the current environment.
 */

const { AppEnv } = require('../enums/app-env');

const { APP_ENV = AppEnv.LOCAL_DEV } = process.env;

function getSiteUrl({ appEnv = APP_ENV, baseDomain = 'time.com' } = {}) {
  const siteUrlMap = {
    [AppEnv.LOCAL_DEV]: 'http://localhost:8000',
    [AppEnv.DEV]: `https://dev.${baseDomain}`,
    [AppEnv.QA]: `https://qa.${baseDomain}`,
    [AppEnv.PROD]: `https://${baseDomain}`,
  };

  // If the given app environment is not a
  // valid one, throw an error.
  if (!siteUrlMap[appEnv]) {
    throw new Error(`Invalid appEnv: ${appEnv}`);
  }

  return siteUrlMap[appEnv];
}

module.exports = {
  getSiteUrl,
};
