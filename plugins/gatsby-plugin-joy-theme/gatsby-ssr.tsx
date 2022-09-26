import React from 'react';
import { GatsbySSR } from 'gatsby';
import AppThemeProvider from './AppThemeProvider';

const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
  <AppThemeProvider>{element}</AppThemeProvider>
);

export { wrapRootElement };
