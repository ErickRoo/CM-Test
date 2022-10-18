// Code in the file gatsby-node.js is run once in the process of building your site. You can use its APIs to create pages dynamically, add data into GraphQL, or respond to events during the build lifecycle.
const endpoint = 'https://assets.time.com/afghan-women/page-data.json';
const path = require('path');
const axios = require('axios');

// eslint-disable-next-line no-console
console.log('✨ gatsby-node from afghan-women');

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  // This function is to count the number of pullquote sections and add an index to each section's data
  // The background images for these sections need to be positioned differently, and so this index is used
  // to adjust the object-position for each one individually
  const countQuoteSections = (pageData) => {
    let index = 1;
    for (let i = 0; i < pageData.length; i += 1) {
      if (pageData[i].section === 'quote') {
        pageData[i].sectionContent.instance = index;
        index += 1;
      }
    }

    return pageData;
  };

  const response = await axios.get(endpoint);
  const { data } = response;
  const pageContent = countQuoteSections(data);

  createPage({
    path: '/',
    component: path.resolve('src/templates/home/index.jsx'),
    context: {
      pageContent,
    },
  });
};
