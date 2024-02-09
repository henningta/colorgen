// @ts-check

import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';
import { ip } from 'address';

/**
 * @param phase string
 * @returns {import('next').NextConfig}
 **/
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    console.log('info  - Local network:', `http://${ip()}:3000`);
    return {
      /* development only config options here */
    };
  }

  return {
    /* config options for all phases except development here */
    experimental: {
      optimizePackageImports: ['@mui/joy'],
    },
  };
};

export default nextConfig;
