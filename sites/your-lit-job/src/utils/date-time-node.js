// Unfortunately, gatsby-node.js cannot handle imports; this file converts requires to import for ES6 implementations

const { timezone, locale } = require('./date-time');

export { timezone, locale };
