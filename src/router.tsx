import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export function getRouter() {
  const router = createRouter({
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
    router: ReturnType<typeof getRouter>;
  }
}
