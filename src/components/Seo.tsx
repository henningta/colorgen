import React from 'react';
import Head from 'next/head';
import config from '../config';
import { useRouter } from 'next/router';

export type SeoImage = {
  url?: string;
  alt?: string;
  width?: string;
  height?: string;
};

export type SeoProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
};

type SeoType = {
  title?: string;
  titleTemplate: string;
  description: string;
  url: string;
  siteName: string;
  image?: SeoImage;
};

const Seo: React.FC<SeoProps> = ({
  children,
  title,
  description,
  image: imgUrl,
}) => {
  const router = useRouter();

  const seo: SeoType = {
    ...config,
    title: title ? config.titleTemplate.replace('%s', title) : config.siteName,
    description: description || config.description,
    image: {
      url: `${config.siteUrl}${imgUrl}`,
      // alt: '',
      width: '80',
      height: '80',
    },
    url: `${config.siteUrl}${router.asPath.substring(1)}`,
  };

  // console.log(seo.image);

  return (
    <Head>
      {/* Page/tab title */}
      <title>{seo.title}</title>

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

      {seo.image?.url && (
        <>
          <meta property="og:image" content={seo.image.url} />
          <meta property="og:image:secure_url" content={seo.image.url} />
        </>
      )}
      {seo.image?.alt && (
        <meta property="og:image:alt" content={seo.image.alt} />
      )}
      {seo.image?.width && (
        <meta property="og:image:width" content={seo.image.width} />
      )}
      {seo.image?.height && (
        <meta property="og:image:height" content={seo.image.height} />
      )}

      {/* OG optional */}
      {seo.siteName && <meta property="og:site_name" content={seo.siteName} />}

      {/* Dynamic options */}
      {children}
    </Head>
  );
};

export default Seo;
