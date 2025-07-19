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

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
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
);

export default App;
