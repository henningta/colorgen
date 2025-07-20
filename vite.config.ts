import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { checker } from 'vite-plugin-checker';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    checker({
      eslint: {
        lintCommand:
          'eslint src/** --ext ts,tsx --report-unused-disable-directives',
        useFlatConfig: true,
      },
      overlay: {
        initialIsOpen: 'error',
      },
      typescript: {
        tsconfigPath: './tsconfig.app.json',
      },
    }),
  ],
  optimizeDeps: {
    include: ['react-helmet-async'],
  },
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
