import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultErrorComponent: (e) => <p>{e.error.stack}</p>,
    defaultNotFoundComponent: () => <p>not found</p>,
    scrollRestoration: true,
  });

  return router;
}

declare module '@tanstack/react-router' {
  // eslint-disable-next-line
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
