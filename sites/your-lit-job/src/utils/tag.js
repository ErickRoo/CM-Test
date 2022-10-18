// Unfortunately, gatsby-node.js cannot handle imports; this file converts requires to import for ES6 implementations

const {
  filterTagsByParent,
  stripTagParents,
  sortTagsByName,
  toSlug,
  getHumanTagList,
  hasTagById,
} = require('./tag-node');

export { filterTagsByParent, stripTagParents, sortTagsByName, toSlug, getHumanTagList, hasTagById };
