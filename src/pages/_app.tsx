import 'nprogress/nprogress.css';
import '../styles/nprogress.css';

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
import Router from 'next/router';
import nprogress from 'nprogress';
import Head from 'next/head';

nprogress.configure({
  showSpinner: false,
});

// Router.events.on('routeChangeStart', () => nprogress.start());
// Router.events.on('routeChangeComplete', () => nprogress.done());
Router.events.on('routeChangeError', () => nprogress.done());

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
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
  </>
);

export default App;
