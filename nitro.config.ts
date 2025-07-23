import { defineNitroConfig } from 'nitropack/config';

export default defineNitroConfig({
  preset: 'aws-amplify',
  awsAmplify: {
    runtime: 'nodejs20.x',
  },
  rollupConfig: {
    onLog: (level, log, handler) => {
      if (log.code === 'MODULE_LEVEL_DIRECTIVE') {
        return;
      }
      handler(level, log);
    },
  },
});
