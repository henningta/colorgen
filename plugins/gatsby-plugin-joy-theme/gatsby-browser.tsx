import React from 'react';
import { GatsbyBrowser } from 'gatsby';
import AppThemeProvider from './AppThemeProvider';

const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  console.debug('gatsby-plugin-joy-theme: onClientEntry');
};

const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
  <AppThemeProvider>{element}</AppThemeProvider>
);

export { onClientEntry, wrapRootElement };
