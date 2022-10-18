// Unfortunately, gatsby-node.js cannot handle imports; this file converts requires to import for ES6 implementations

const { arrayChunk, arrayShuffle } = require('./array-node');

export { arrayChunk, arrayShuffle };
