import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { checker } from 'vite-plugin-checker';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackStart({ customViteReactPlugin: true }),
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
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
