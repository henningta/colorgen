import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { checker } from 'vite-plugin-checker';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackStart({
      // customViteReactPlugin: true,
      srcDirectory: 'src',
      // target: 'aws-amplify',
    }),
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
        tsconfigPath: './tsconfig.json',
      },
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
