/**
 * The configs below are for the Gatsby ESLint plugin
 */

const path = require('path');

// Get paths of Gatsby's required rules
const gatsbyRequiredRulesDir = path.join('./../../', 'node_modules', 'gatsby', 'dist', 'utils', 'eslint-rules');

module.exports = {
  // Gatsby required rules directory
  rulePaths: [gatsbyRequiredRulesDir],
  // Default settings that may be omitted or customized
  stages: ['develop'],
  extensions: ['js', 'jsx', 'ts', 'tsx'],
  exclude: ['node_modules', 'bower_components', '.cache', 'public'],
  // Custom Greenlight settings
  failOnError: false,
  emitWarning: false,
};
