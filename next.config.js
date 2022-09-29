// @ts-check

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    console.log(
      'info  - Local network:',
      `http://${require('address').ip()}:3000`
    );
    return {
      /* development only config options here */
    };
  }

  return {
    /* config options for all phases except development here */
  };
};

module.exports = nextConfig;
