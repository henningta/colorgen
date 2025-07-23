/// <reference types="vite/client" />

import type { PropsWithChildren } from 'react';
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import {
  AppThemeProvider,
  AppContextProvider,
  SnackbarProvider,
} from '../context';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { InitColorSchemeScript } from '@mui/material';

const fontsUrl =
  'https://fonts.googleapis.com/css2?family=Manrope:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap';

const description = 'An advanced color visualizer and palette generator tool';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'colorgen.io' },
      { name: 'description', content: description },

      // og
      { property: 'og:site_name', content: 'colorgen.io' },
      { property: 'og:title', content: 'colorgen.io' },
      { property: 'og:description', content: description },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      { rel: 'preload', as: 'style', href: fontsUrl },
      { rel: 'stylesheet', href: fontsUrl },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function Providers({ children }: PropsWithChildren) {
  return (
    <AppThemeProvider>
      <AppContextProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </AppContextProvider>
    </AppThemeProvider>
  );
}

function RootDocument({ children }: Readonly<PropsWithChildren>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <InitColorSchemeScript attribute='[data-mui-color-scheme="%s"]' />
        <Providers>{children}</Providers>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
