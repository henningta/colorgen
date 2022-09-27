export type NextConfig = {
  siteName: string;
  titleTemplate: string;
  description: string;
  siteUrl: string;
};

const config: NextConfig = {
  siteName: 'colorgen.io',
  titleTemplate: '%s · colorgen.io',
  description: 'An advanced color visualizer and palette generator tool',
  siteUrl: 'https://www.colorgen.io/',
};

export default config;
