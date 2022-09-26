import React from 'react';
import { Helmet } from 'react-helmet-async';
import useSiteMetadata from './useSiteMetadata';

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
    <Helmet
      title={seo.title || seo.siteName}
      titleTemplate={seo.title ? seo.titleTemplate : undefined}
      prioritizeSeoTags
      htmlAttributes={{ lang: 'en' }}
    >
      {/* Page/tab title */}
      {/* <title>
        {seo.title ? titleTemplate.replace('%s', seo.title) : seo.siteName}
      </title> */}

      {/* Global defaults */}
      <link rel="canonical" href={seo.url} />
      {/* <meta name="theme-color" content="#000" /> */}
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

      {/* Dynamic options */}
      {children}
    </Helmet>
  );
};

export default Seo;
