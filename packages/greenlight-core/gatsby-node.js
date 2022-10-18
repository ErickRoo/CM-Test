// Code in the file gatsby-node.js is run once in the process of building your site. You can use its APIs to create pages dynamically, add data into GraphQL, or respond to events during the build lifecycle.

// eslint-disable-next-line no-console
console.log('✨ gatsby-node from greenlight-core');

// log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info('Your Gatsby site has been built!');
};
