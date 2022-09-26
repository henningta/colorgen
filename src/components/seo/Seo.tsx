import React from 'react';
import { useMounted } from '../../utils';
import useSiteMetadata from './useSiteMetadata';

const fontsUrl =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Manrope:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap';

export type SeoProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  image?: any;
  pathname?: string;
};

type SeoType = {
  title?: string;
  titleTemplate: string;
  description: string;
  url: string;
  siteName: string;
};

const Seo: React.FC<SeoProps> = ({
  children,
  title,
  description,
  pathname,
}) => {
  const mounted = useMounted();

  const {
    titleTemplate,
    description: defaultDescription,
    // image,
    siteUrl,
    siteName,
  } = useSiteMetadata();

  const seo: SeoType = {
    title,
    titleTemplate,
    description: description || defaultDescription,
    // image: image
    //   ? {
    //       ...image,
    //       url: `${siteUrl}${image.url}`,
    //     }
    //   : {
    //       ...defaultImage,
    //       url: `${siteUrl}${defaultImage.url}`,
    //     },
    url: `${siteUrl}${pathname || ''}`,
    siteName,
  };

  return (
    <>
      {/* Page/tab title */}
      <title>
        {seo.title ? titleTemplate.replace('%s', seo.title) : seo.siteName}
      </title>

      {/* Global defaults */}
      <link rel="canonical" href={seo.url} />
      <meta name="theme-color" content="#000" />
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      {/* <meta name="image" content={seo.image.url} /> */}

      {/* OG basic */}
      {seo.url && <meta property="og:url" content={seo.url} />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {/* {seo.image.url && (
        <meta property="og:image:secure_url" content={seo.image.url} />
      )}
      {seo.image.alt && (
        <meta property="og:image:alt" content={seo.image.alt} />
      )}
      {seo.image.width && (
        <meta property="og:image:width" content={seo.image.width} />
      )}
      {seo.image.height && (
        <meta property="og:image:height" content={seo.image.height} />
      )} */}

      {/* OG optional */}
      {siteName && <meta property="og:site_name" content={siteName} />}

      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preload" as="style" href={fontsUrl} />
      <link
        rel="stylesheet"
        href={fontsUrl}
        media={mounted ? 'all' : 'print'}
      />

      {/* Dynamic options */}
      {children}
    </>
  );
};

export default Seo;
