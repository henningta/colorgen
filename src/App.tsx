// Import the generated route tree
import { routeTree } from './routeTree.gen';

import { RouterProvider, createRouter } from '@tanstack/react-router';
import {
  AppContextProvider,
  AppThemeProvider,
  ColorContextProvider,
  SnackbarProvider,
} from './context';
import { Splash } from './components';
import nprogress from 'nprogress';
import { HelmetProvider } from 'react-helmet-async';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  // eslint-disable-next-line
  interface Register {
    router: typeof router;
  }
}

nprogress.configure({
  showSpinner: false,
});

// Router.events.on('routeChangeStart', () => nprogress.start());
// Router.events.on('routeChangeComplete', () => nprogress.done());
// Router.events.on('routeChangeError', () => nprogress.done());

// router.subscribe('')

const App = () => (
  <HelmetProvider>
    <AppThemeProvider>
      <AppContextProvider>
        <ColorContextProvider>
          <SnackbarProvider>
            <Splash />
            <RouterProvider router={router} />
          </SnackbarProvider>
        </ColorContextProvider>
      </AppContextProvider>
    </AppThemeProvider>
  </HelmetProvider>
);

export default App;
