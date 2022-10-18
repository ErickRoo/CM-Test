// Unfortunately, gatsby-node.js cannot handle imports; this file converts requires to import for ES6 implementations

const { removePlaceholderNodes, isPlaceholder } = require('./placeholder-node');

// eslint-disable-next-line import/prefer-default-export
export { removePlaceholderNodes, isPlaceholder };
