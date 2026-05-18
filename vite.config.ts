import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { checker } from 'vite-plugin-checker';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { nitro } from 'nitro/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackStart({ srcDirectory: 'src' }),
    // @ts-expect-error
    nitro({ preset: 'aws-amplify', awsAmplify: { runtime: 'nodejs24.x' } }),
    react(),
    checker({
      eslint: {
        lintCommand:
          'eslint src/** --ext ts,tsx --report-unused-disable-directives',
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
