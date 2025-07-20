import fs from 'node:fs/promises';
import fastify from 'fastify';
import middie from '@fastify/middie';
import colorImageRoute from './routes/color-image.js';

const isProduction = process.env.NODE_ENV === 'production';
const host = isProduction ? undefined : 'localhost';
const port = process.env.PORT || 3000;
const base = process.env.BASE || '/';

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';

const app = fastify();
await app.register(middie); // Enables use of express-style middleware (for Vite or sirv)

// Vite Dev Server or static assets in production
/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

// Handle all GET requests
app.get('/*', async (req, reply) => {
  try {
    const url = req.raw.url.replace(base, '');

    /** @type {string} */
    let template;
    /** @type {import('../src/entry-server.js').render} */
    let render;

    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }

    const rendered = await render(url);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '');

    reply.code(200).header('Content-Type', 'text/html').send(html);
  } catch (e) {
    vite?.ssrFixStacktrace?.(e);
    console.error(e.stack);
    reply.code(500).send(e.stack);
  }
});

// Handle api GET requests
await app.register(colorImageRoute);

// Start http server
app.listen({ host, port }, () => {
  console.log(`Server started at ${host}:${port}`);
});
