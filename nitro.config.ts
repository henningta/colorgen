import { defineNitroConfig } from 'nitropack/config';

export default defineNitroConfig({
  preset: 'aws-amplify',
  awsAmplify: {
    runtime: 'nodejs20.x',
  },
});
