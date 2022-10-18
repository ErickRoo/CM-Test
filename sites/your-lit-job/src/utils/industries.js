// Unfortunately due to some bugs with Gatsby and static queries, this information
// cannot be reliably pulled from Contentful. However, we are assured that industries
// will never change. In the off-chance that they do, this file can be updated accordingly

const { industries, searchNavbarIndustryByTagName } = require('./industries-node');

export function getIndustryByTag(tag) {
  return industries.find((industry) => {
    return industry.metadata.tags.find((t) => {
      return t.name === tag;
    });
  });
}

export { searchNavbarIndustryByTagName };

export default industries;
