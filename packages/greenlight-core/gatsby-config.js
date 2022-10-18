// eslint-disable-next-line no-console
console.log('✨ gatsby-config from greenlight-core');

const { getSiteUrl } = require('greenlight-shared/src/utils/get-site-url');
const { NodeEnv } = require('greenlight-shared/src/enums/node-env');
const path = require('path');

const envPath = path.resolve(`./../../`); // path to repo root relative to sites/[site]

const gatsbyPluginESLintConfigs = require('../../utils/eslint/gatsby-plugin-eslint-configs');

require('dotenv').config({
  path: `${envPath}/.env.${process.env.NODE_ENV}`,
});

const {
  AWS_S3_BUCKET,
  NODE_ENV = NodeEnv.DEVELOPMENT,
  CI = 'false',
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_PREVIEW = 'false',
} = process.env;

if (CONTENTFUL_ACCESS_TOKEN === '') {
  throw new Error('CONTENTFUL_ACCESS_TOKEN must be added to .env.development and .env.production');
}

if (CONTENTFUL_ENVIRONMENT === '') {
  throw new Error('CONTENTFUL_ENVIRONMENT must be added to .env.development and .env.production');
}

// default plugins
let plugins = [
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-sass',
  'gatsby-plugin-sharp',
  'gatsby-plugin-image',
  'gatsby-transformer-sharp',
  {
    resolve: 'gatsby-plugin-eslint',
    options: gatsbyPluginESLintConfigs,
  },
];

/**
 * Contentful plugin for Gatsby to fetch content from Contentful
 *
 * @param {string} spaceId – Contentful space ID
 * @param {string} accessToken – Contentful PAT
 * @param {string} environment – Contentful environment (master, main, sandbox, etc.)
 * @returns {object} – Gatsby plugin object
 */
const contentfulPlugin = (spaceId, accessToken, environment, isPreview) => ({
  // https://www.gatsbyjs.com/plugins/gatsby-source-contentful/
  resolve: 'gatsby-source-contentful',
  options: {
    spaceId,
    accessToken,
    useNameForId: false,
    environment,
    enableTags: true,
    host: `${isPreview ? 'preview' : 'cdn'}.contentful.com`,
  },
});

/**
 * S3 plugin for Gatsby to upload files to AWS S3
 *
 * @param {string} bucketName – AWS S3 bucket name
 * @param {string} bucketPrefix – AWS S3 bucket prefix
 * @param {string} protocol – URL protocol (http or https)
 * @param {string} hostname – URL hostname
 * @returns {object} – Gatsby plugin object
 */
const s3Plugin = (bucketName, bucketPrefix = '', protocol = 'https', hostname = 'time.com') => ({
  resolve: 'gatsby-plugin-s3',
  options: {
    bucketName,
    bucketPrefix,
    protocol,
    hostname,
    // We don't want to use an ACL, set we're setting this to `null`
    acl: null,
  },
});

// given themeOptions, conditionally add appropriate plugin to the `plugins` array to be exported
module.exports = (themeOptions) => {
  const { data: { contentful = {} } = {} } = themeOptions;

  // Contentful API
  if (contentful) {
    // eslint-disable-next-line no-console
    console.log(`✨ Configuring query for Contentful space '${contentful.spaceId}'`);

    plugins = [
      ...plugins,
      contentfulPlugin(
        contentful.spaceId,
        CONTENTFUL_ACCESS_TOKEN,
        CONTENTFUL_ENVIRONMENT,
        CONTENTFUL_PREVIEW === 'true'
      ),
    ];
  }

  // Only load the AWS S3 plugin if we're building the
  // site using the Gatsby CLI command `gatsby build`
  // which sets the NODE_ENV environment variable to
  // `production`.
  const siteAddress = new URL(getSiteUrl());
  const { pathPrefix } = themeOptions;

  if (NODE_ENV === NodeEnv.PRODUCTION && CI === 'true' && typeof AWS_S3_BUCKET !== 'undefined') {
    plugins = [...plugins, s3Plugin(AWS_S3_BUCKET, pathPrefix, siteAddress.protocol, siteAddress.hostname)];
  }

  return {
    plugins,
  };
};
