# 🟢 Greenlight

[![Maintainability](https://api.codeclimate.com/v1/badges/32937fcf5d4795a40b78/maintainability)](https://codeclimate.com/repos/615b32078041c57ce3002530/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/32937fcf5d4795a40b78/test_coverage)](https://codeclimate.com/repos/615b32078041c57ce3002530/test_coverage)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

_This project is in flux, and some information below may be outdated as we continue to work toward stability._

## Introduction

Greenlight is a collection of [Gatsby](https://www.gatsbyjs.org/) sites (typically used for TIME special projects) composed of [Gatsby Themes](https://www.gatsbyjs.com/docs/themes/), organized via npm [workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces).

Gatsby is an open source SSG ([Static Site Generator](https://www.gatsbyjs.com/docs/glossary/static-site-generator/)) framework based on [React](https://reactjs.org/), [Webpack](https://webpack.js.org/) and [GraphQL](https://graphql.org/). Before moving forward, spend some time understanding the fundamentals of Gatsby by reading some of their [tutorials and guides](https://www.gatsbyjs.com/docs).

## Setting Up

1. `git clone https://github.com/timedotcom/greenlight.git && cd greenlight`
2. `nvm use` if you have [`nvm`](https://github.com/nvm-sh/nvm) or switch to node `v16.13.0` manually.
3. `npm install` in repo root. This will install dependencies for all workspaces.
4. Add Contentful API access token for the site's Contentful Space to `.env.development` and `.env.production` files in the repo root using the environment variable `CONTENTFUL_ACCESS_TOKEN`(more info below). If you do not have access to TIME's Contentful account, please reach out to someone in the Product & Engineering team.

More information on how to set up you local development environment for Gatsby can be found [here](https://www.gatsbyjs.com/docs/reference/gatsby-project-structure/).

## `npm` scripts

You can run the `npm` scripts below from the root of the directory. The `develop`, `clean`, and `build` scripts will run the corresponding Gatsby CLI commands at the root of the give Greenlight site(`sites/SITE_NAME/*`). Gatsby CLI commands are documented [here](https://www.gatsbyjs.com/docs/reference/gatsby-cli/). Here is a quick overview of the commands we use in this codebase:

- `develop` – starts a development server with hot reloading
- `clean` – wipes out the cache (`.cache `folder) and `public` directories
- `build` – compiles the site and makes it ready for deployment(always paired with `deploy`)
- `serve` – serves the site locally, used for testing

### `develop`

Runs `gatsby develop` if given a `site` as a parameter. If no `site` parameter is given, it will run `gatsby develop` on all sites. If the given `site` parameter doesn't exist, it will error out.

Example usage:

- `npm run develop --site=time-studios` (a single site will spin up a dev server)
- `npm run develop` (all sites will spin up a dev server)

### `build`

Runs `gatsby build` if given a `site` as a parameter. If no `site` parameter is given, it will run `gatsby build` on all sites. If the given `site` parameter doesn't exist, it will error out.

Example usage:

- `npm run build --site=time-studios` (a single site will build)
- `npm run build` (all sites will build)

### `deploy`

Runs `gatsby-plugin-s3 deploy` if given a `site` as a parameter, which uses the Gatsby plugin [`gatsby-plugin-s3`](https://www.gatsbyjs.com/plugins/gatsby-plugin-s3/) to upload to an AWS s3 bucket where static Greenlight sites/projects are hosted. If a `site` parameter is not given, it will run `gatsby-plugin-s3 deploy` on all sites. If the given `site` parameter doesn't exist, it will error out.

**Note:** This command should only run in a CI environment and after `build` has been run. Also, the `gatsby-plugin-s3` plugin will not work if the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables are not set.

Example usage:

- `npm run deploy --site=time-studios` (a single site will deploy)
- `npm run deploy` (all sites will deploy)

### `clean`

Runs `gatsby clean` if given a `site` as a parameter. If no `site` parameter is given, it will run `gatsby clean` on all sites. If the given `site` parameter doesn't exist, it will error out.

This also run the npm script `clean-install` below.

Example usage:

- `npm run clean --site=time-studios` (a single site will clean)
- `npm run clean` (all sites will "clean")

### `clean-install`

This will delete the `package-lock.json` file, the `node_modules` folder, and will run `npm install`.

### `lint:*`

- `lint:js` will run ESLint using the configs in `.eslintrc.js`
- `lint:scss` will run Stylint using the configs in `.stylelintrc.js`
- `lint` will run both `lint:js` and `lint:scss`

### `jest` & `test`

`jest` will run the Jest unit tests. `test` will run the `lint` scripts above and then run the Jest unit tests via the `jest` script.

## Running a Gatsby Development Server

From the repo root:

1. Run `npm run develop --site=SITE_NAME` (replace `SITE_NAME` with a site listed in [this directory](https://github.com/timedotcom/greenlight/tree/main/sites), for example `time-studios`)
2. Open `http://localhost:8000/` in the browser of your choice after a successful build.

## Environment Variables

| Variable(s)               | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NODE_ENV`                | This environment variable is set by Gatsby or Jest and not manually set anywhere else. <br>When running the commands:<br>- `gatsby develop`, Gatsby will set `NODE_ENV` to `development`<br>- `gatsby build`, Gatsby will set `NODE_ENV` to `production`<br>- `jest`(via Jest CLI tool), Jest will set `NODE_ENV` to `test`                                                                                                                                          |
| `APP_ENV`                 | The environment where we're running the `develop` or `build` <br>npm script(mostly meant for `build`). <br>There are four environments:<br>- `local-development` (localhost:8000)<br>- `development` (dev.time.com)<br>- `qa` (qa.time.com)<br>- `production` (time.com)<br><br>Custom environment variable that is set locally or during the [Deployment GitHub Workflow](https://github.com/timedotcom/greenlight/actions/workflows/deployment.yml) for this repo. |
| `CONTENTFUL_ACCESS_TOKEN` | Access token to the Contentful Space where the site will be using as its CMS. The access token generated should be for [Contentful's Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/).<br>Custom environment variable that is set locally or during the [Deployment GitHub Workflow](https://github.com/timedotcom/greenlight/actions/workflows/deployment.yml) for this repo.                                             |
| `CONTENTFUL_ENVIRONMENT`  | [Contentful Environment](https://www.contentful.com/developers/docs/concepts/multiple-environments/) to use given the Contentful Space (via `CONTENTFUL_ACCESS_TOKEN`). Currently, this is set locally.                                                                                                                                                                                                                                                              |
| `AWS_ACCESS_KEY_ID`       | Required by AWS when using the AWS CLI tool, which we're using through the `gatsby-plugin-s3` plugin. This is set **only** during the [Deployment GitHub Workflow](https://github.com/timedotcom/greenlight/actions/workflows/deployment.yml) for this repo.                                                                                                                                                                                                         |
| `AWS_SECRET_ACCESS_KEY`   | Required by AWS when using the AWS CLI tool, which we're using through the `gatsby-plugin-s3` plugin. This is set **only** during the [Deployment GitHub Workflow](https://github.com/timedotcom/greenlight/actions/workflows/deployment.yml) for this repo.                                                                                                                                                                                                         |

_Note: if you would like to update this table or want to generate a new one, check out [this](https://www.tablesgenerator.com/markdown_tables) tool._

## GitHub Workflows

You can find all of the GitHub Workflows for Greenlight in the [Actions](https://github.com/timedotcom/greenlight/actions) tab above.

### [Node.js](https://github.com/timedotcom/greenlight/actions/workflows/node.yml)

This will do a clean install of node dependencies, cache/restore them, build the source code and run tests(as of now, only on Node v16). This will also send test coverage to Code Climate. This workflow runs every time a commit is pushed to a remote branch **except** for the `sandbox` and `main` branch (they still use the workflow, but as part of the Deployment workflow).

### [Deployment 🚀](https://github.com/timedotcom/greenlight/actions/workflows/deployment.yml)

This will build a Greenlight site via their `build` `npm` script (usually `gatsby build --prefix-paths`) and upload the built assets to an S3 bucket via the `gatsby-plugin-s3` plugin (see `deploy` `npm` script above). There are two ways to trigger this deployment:

- **Automatically** – when a commit is pushed to the `sandbox` or `main` branch that involve changes in `sites/*` to one of the sites. It will only deploy for sites that have changes. For example, if the only files updated were in `sites/time-studios`, then it will only deploy for the `time-studios` project and does not deploy for other projects. It will ignore changes outside of `sites/*` but you still have the option to manually trigger a deployment
- **Manually** – by going to the [Deployment 🚀](https://github.com/timedotcom/greenlight/actions/workflows/deployment.yml) workflow tab, clicking the `Run workflow` button, selecting the branch to run the workflow from in the **Use workflow from** dropdown(`sandbox` or `main`), and then selecting one of the sites in `sites/*` to deploy.

A commit pushed to the `sandbox` branch or a manually triggered deployment from the `sandbox` branch will deploy to the **DEV** environment(`https://dev.time.com`). A commit pushed to the `main` branch or a manually triggered deployment from the `main` branch will deploy to the **PROD** environment(`https://time.com`). As of now, there is no workflow to deploy to the **QA** environment(`https://qa.time.com`), but it could be introduced in the future.

## FAQs

### `npm` workspaces dependency management

Make sure you're installing dependencies from the root using the [`w` or `workspace` arg](https://docs.npmjs.com/cli/v7/using-npm/workspaces#adding-dependencies-to-a-workspace), or adding the dependency to the `package.json` file directly and running `npm install`, `npm ci` or `npm run clean-install`(which will delete the `package-lock.json` file before installing the dependencies again) from the root. Otherwise, it'll create a `node_modules` folder in the site(`sites/*`) directory.

### Merge conflicts with `package-lock.json`

If you run into a merge conflict with the `package-lock.json` file, try the [suggested approach from `npm`](https://docs.npmjs.com/cli/v6/configuring-npm/package-locks#resolving-lockfile-conflicts) on how to resolve them, which is the following:

1. Only resolve the merge conflicts in `package.json`
2. Run `npm install` again

### Using a plugin for a specific site

If a site needs to use a plugin that's not loaded by `greenlight-core`, you'll need to:

1. Install + add the plugin as a dependency for the site using the instructions in **`npm` workspaces dependency management** above. Make sure to use the `--save` flag so it's added to the site's `package.json` file.
2. Update the `gatsby-config.js` file for the site to include the plugin via the [`plugins` config option](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/#plugins).

If a site needs to use a plugin that's already loaded by `greenlight-core` but with different plugin options, you'll need to follow the steps above(1-2) but change the plugin options when adding the plugin to the [`plugins` config option](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/#plugins).

`greenlight-core` is set up as a [Gatsby Theme](https://www.gatsbyjs.com/docs/themes/) in this codebase, which means each site in `sites/*` that uses the `greenlight-core` theme can have its own `plugins` config which will combine with the `plugins` config option in `greenlight-core`. When a site has a plugin that's already listed in a theme's `plugins` config option, Gatsby should automatically use the site's plugin options over the options set in the theme(`greenlight-core` in this case).

For example, `greenlight-core` has the `gatsby-plugin-sharp`(with default options) listed as one of its plugins, which means all sites that use the `greenlight-core` theme will also load this plugin. However, if we wanted to use a different `defaultQuality` option(or any other option [here](https://www.gatsbyjs.com/plugins/gatsby-plugin-sharp/#options)) for the `time-studios` site, we would need to add the `gatsby-plugin-sharp` plugin to `sites/time-studios/gatsby-config.js` via the `plugins` config option but with the `defaultQuality` option set:

```js
  plugins: [
    // ... other plugins for the site

    // override options set in `greenlight-core` for the `gatsby-plugin-sharp` plugin
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaultQuality: 100,
      },
    },
  ],
```

### How to use the `APP_ENV` environment variable

Let's say we need to test a GA implementation. Assuming we create a GA property for each environment, you'd create a map using the `APP_ENV` env variable and the corresponding GA property ID for that environment. As mentioned above, `APP_ENV` is automatically set when we run a build and deploy. For example, in `gatsby-config.js`, you can do the following:

```js
const { AppEnv } = require('../enums/app-env');
const { APP_ENV = AppEnv.DEVELOPMENT } = process.env;
const gaPropertyIdMap = {
  [AppEnv.DEVELOPMENT]: 'UA-12345-1',
  [AppEnv.QA]: 'UA-12345-2',
  [AppEnv.PRODUCTION]: 'UA-12345-3',
};

// Or create a small helper
const getGaPropertyId = () => {
  const { AppEnv } = require('../enums/app-env');
  const { APP_ENV = AppEnv.DEVELOPMENT } = process.env;
  const gaPropertyIdMap = {
    [AppEnv.DEVELOPMENT]: 'UA-12345-1',
    [AppEnv.QA]: 'UA-12345-2',
    [AppEnv.PRODUCTION]: 'UA-12345-3',
  };

  return gaPropertyIdMap[APP_ENV];
};

// or you can add the IDs to your `site-config.js` and reduce the code in `gatsby-config.js` to
const { AppEnv } = require('../enums/app-env');
const { APP_ENV = AppEnv.DEVELOPMENT } = process.env;
const { gaPropertyIdMap } = siteConfig;

// default to a dev property id to avoid polluting production data
const gaPropertyId = gaPropertyIdMap[APP_ENV] ?? gaPropertyIdMap[AppEnv.DEVELOPMENT];
```

We could also default `APP_ENV` to `AppEnv.LOCAL_DEV`, but presumably, we'd want to test this only on our hosted environments. If we did want to test this locally and decide to default `APP_ENV` to `AppEnv.LOCAL_DEV`, we'd just need to include `AppEnv.LOCAL_DEV` in the ID map.

## Useful links

- [Deploy a Gatsby project to S3/Cloudfront](https://www.gatsbyjs.org/docs/deploying-to-s3-cloudfront/)
- [Adding an Asset Prefix](https://www.gatsbyjs.org/docs/asset-prefix/) (to setup with `assets.time.com`)
- [What You Don't Need Plugins For](https://www.gatsbyjs.org/docs/what-you-dont-need-plugins-for/)
- [Monorepo example](https://github.com/jedrichards/monorepo-test) shared in a [Github issue](https://github.com/gatsbyjs/gatsby/issues/9352z) raised in the `gatsby` repo
- [Original Greenlight Prototype Google doc](https://docs.google.com/document/d/1wp8U7YrbIdQErcFDBh6vSeJWQa3CFWtfizLvt-aOgug/edit)
- [Gatsby's Green Light](https://www.sparknotes.com/lit/gatsby/quotes/symbol/the-green-light/)
