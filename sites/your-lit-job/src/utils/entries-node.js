const { filterTagsByParent } = require('./tag-node');
const { arrayChunk } = require('./array-node');

exports.sortableEntry = (entry) => {
  const types = ['ContentfulArticle', 'ContentfulMultimedia', 'ContentfulAsk', 'ContentfulMeetup'];
  const tags = entry.metadata && entry.metadata.tags ? filterTagsByParent(entry.metadata.tags, ['Skill']) : [];
  return types.indexOf(entry.internal.type) >= 0 && tags.length > 0;
};

exports.stickyEntry = (entry) => {
  return entry.sticky;
};

exports.filterSortableEntries = (entries) => {
  return entries.filter((entry) => {
    return exports.sortableEntry(entry);
  });
};

exports.filterNonsortableEntries = (entries) => {
  return entries.filter((entry) => {
    return !exports.sortableEntry(entry);
  });
};

exports.filterStickyEntries = (entries) => {
  return entries.filter((entry) => {
    return exports.stickyEntry(entry);
  });
};

exports.filterNonstickyEntries = (entries) => {
  return entries.filter((entry) => {
    return !exports.stickyEntry(entry);
  });
};

exports.sortEntriesBySticky = (entries) => {
  return entries.sort((a, b) => {
    if (a.sticky > b.sticky) {
      return 1;
    }

    if (a.sticky < b.sticky) {
      return -1;
    }

    return 0;
  });
};

exports.injectEntriesByNth = (entries, filler, nth) => {
  return arrayChunk(entries, nth - 1).flatMap((i) => (filler.length ? i.concat(filler.shift()) : i));
};

exports.sortEntriesByPriority = (orginalEntries, tie = null, mutator = null) => {
  // Clone entries
  const entries = orginalEntries.map((obj) => {
    return { ...obj };
  });

  // Generate points for each article
  entries.forEach((article) => {
    article.points = 0;

    // Opportunity for advanced manipulation
    if (mutator) {
      article.points = mutator(article);
    }
  });

  // Sort by points with accomodation for ties
  entries.sort((a, b) => {
    if (a.points > b.points) {
      return -1;
    }
    if (a.points < b.points) {
      return 1;
    }

    // Resolve ties with publish date or meeting date
    if (tie === 'date') {
      const aDate = a.eventDate ? a.eventDate : a.publishDate;
      const bDate = b.eventDate ? b.eventDate : b.publishDate;
      if (aDate > bDate) {
        return -1;
      }
      if (aDate < bDate) {
        return 1;
      }
    }

    return 0;
  });

  return entries;
};

exports.requireOne = (entry, requiredFields) => {
  return requiredFields.some((field) => entry[field] !== null && entry[field] !== undefined);
};

exports.sortByPublishDate = (entries) => {
  entries.sort((a, b) => {
    return new Date(a.publishDate).getTime() < new Date(b.publishDate).getTime() ? 1 : -1;
  });

  return entries;
};
