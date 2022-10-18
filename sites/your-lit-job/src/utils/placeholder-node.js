exports.isPlaceholder = (node) => {
  if (node.slug && node.slug.match(/___placeholder___/i)) {
    return true;
  }

  if (node.title && node.title.match(/___PLACEHOLDER___/i)) {
    return true;
  }

  return false;
};

exports.removePlaceholderNodes = (nodes) => {
  return nodes.filter((node) => {
    return !exports.isPlaceholder(node);
  });
};
