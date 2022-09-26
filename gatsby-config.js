const path = require('path');
const { GatsbyConfig } = require('gatsby');

/**
 * @type GatsbyConfig
 */
const config = {
  siteMetadata: {
    siteName: 'colorgen.io',
    titleTemplate: '%s · colorgen.io',
    description: 'An advanced color visualizer and palette generator tool',
    siteUrl: 'https://www.colorgen.io/',
    // image: {
    //   url: '/logo.png', // relative to 'static' folder
    //   alt: 'colorgen.io logo',
    //   width: 1500,
    //   height: 944,
    // },
  },
  plugins: [
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-joy-theme',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        pages: path.join(__dirname, 'src/pages'),
        styles: path.join(__dirname, 'src/styles'),
      },
    },
    'gatsby-plugin-react-helmet-async',
    'gatsby-plugin-sitemap',
    // {
    //   resolve: 'gatsby-plugin-manifest',
    //   options: {
    //     icon: 'src/images/logo_square.png',
    //   },
    // },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
  ],
};

module.exports = config;
