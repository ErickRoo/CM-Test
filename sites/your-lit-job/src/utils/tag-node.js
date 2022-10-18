exports.filterTagsByParent = (tags, allowedParents) => {
  const regex = new RegExp(allowedParents.join('|'), 'gi');

  return tags.filter((tag) => {
    return tag.name.match(regex);
  });
};

exports.stripTagParents = (tag) => {
  return tag.split(':').reverse()[0];
};

exports.sortTagsByName = (tags) => {
  return tags.sort((a, b) => (a.name > b.name ? 1 : -1));
};

exports.toSlug = (tag) => {
  return exports
    .stripTagParents(tag)
    .replace(' ', '-')
    .replace(/[^-a-z0-9]/i, '')
    .toLowerCase();
};

exports.getTagNames = (tags) => {
  return tags ? tags.map((tag) => tag.name) : [];
};

exports.getHumanTagList = (tags) => {
  const { length } = tags;
  const names = tags.map((tag) => {
    return exports.stripTagParents(tag.name);
  });

  if (length === 1) {
    return names.join('');
  }

  if (length === 2) {
    return names.join(' and ');
  }

  if (length > 2) {
    return names
      .map((tag, i) => {
        return i === length - 1 ? `and ${tag}` : tag;
      })
      .join(', ');
  }

  return null;
};

exports.hasTagById = (id, tags) => {
  const results = tags.filter((tag) => {
    return tag.contentful_id === id;
  });

  return results.length > 0;
};
