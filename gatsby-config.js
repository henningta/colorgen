const path = require('path');

module.exports = {
  siteMetadata: {
    siteName: 'colorgen.io',
    title: 'colorgen.io',
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
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve('./src/layouts/App.tsx'),
      },
    },
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
