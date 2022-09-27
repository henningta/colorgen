import '../styles/global.css';

import React from 'react';
import type { AppProps } from 'next/app';
import {
  AppContextProvider,
  AppThemeProvider,
  ColorContextProvider,
  SnackbarProvider,
} from '../context';
import { Splash } from '../components';
import { AppLayout } from '../layouts';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <AppThemeProvider>
    <AppContextProvider>
      <ColorContextProvider>
        <SnackbarProvider>
          <Splash />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </SnackbarProvider>
      </ColorContextProvider>
    </AppContextProvider>
  </AppThemeProvider>
);

export default App;
