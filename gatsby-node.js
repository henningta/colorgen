const path = require('path');
const { GatsbyNode } = require('gatsby');

/**
 * @type GatsbyNode['onCreatePage']
 */
const onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  createPage({
    path: '/color/[hex].js',
    matchPath: '/color/:hex',
    component: path.resolve('src/pages/color.tsx'),
  });
};

module.exports = { onCreatePage };
