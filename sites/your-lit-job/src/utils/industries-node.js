// Unfortunately, gatsby-node.js cannot handle imports; this file converts requires to import for ES6 implementations

const industries = [
  {
    id: 0,
    title: 'Creators',
    subtitle: 'Artists & Innovators',
    metadata: {
      tags: [
        {
          name: 'Industry:Creators',
        },
      ],
    },
  },
  {
    id: 1,
    title: 'Space',
    subtitle: 'Science & Exploration',
    metadata: {
      tags: [
        {
          name: 'Industry:Space',
        },
      ],
    },
  },
  {
    id: 2,
    title: 'Climate',
    subtitle: 'Environment & Sustainability',
    metadata: {
      tags: [
        {
          name: 'Industry:Climate',
        },
      ],
    },
  },
  {
    id: 3,
    title: 'Sports',
    subtitle: 'Athletics & Management',
    metadata: {
      tags: [
        {
          name: 'Industry:Sports',
        },
      ],
    },
  },
  {
    id: 4,
    title: 'Technology',
    subtitle: 'Engineering & Coding',
    metadata: {
      tags: [
        {
          name: 'Industry:Technology',
        },
      ],
    },
  },
  {
    id: 5,
    title: 'Health',
    subtitle: 'Care & Science',
    metadata: {
      tags: [
        {
          name: 'Industry:Health',
        },
      ],
    },
  },
  {
    id: 6,
    title: 'Hospitality',
    subtitle: 'Tourism & Service',
    metadata: {
      tags: [
        {
          name: 'Industry:Hospitality',
        },
      ],
    },
  },
  {
    id: 7,
    title: 'Public Service',
    subtitle: 'Goverment & Education',
    metadata: {
      tags: [
        {
          name: 'Industry:Public Service',
        },
      ],
    },
  },
];

exports.searchNavbarIndustryByTagName = (tagName = '') => {
  return industries?.find((oneIndustry) => {
    return oneIndustry.metadata.tags[0].name === tagName;
  });
};

exports.industries = industries;
