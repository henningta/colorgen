import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

// const query = graphql`
//   query SEO {
//     site {
//       siteMetadata {
//         defaultTitle: title
//         titleTemplate
//         defaultDescription: description
//         siteUrl
//         defaultImage: image {
//           url
//           alt
//           width
//           height
//         }
//         siteName
//       }
//     }
//   }
// `;

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl
        siteName
      }
    }
  }
`;

export type SeoProps = {
  title?: string;
  description?: string;
  image?: any;
};

const Seo: React.FC<SeoProps> = ({ title, description, image }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(query);

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    // defaultImage,
    siteName,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
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
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet
      title={seo.title}
      titleTemplate={title ? titleTemplate : undefined}
      prioritizeSeoTags
    >
      {/* Global defaults */}
      <link rel="canonical" href={seo.url} />
      <meta name="theme-color" content="#000" />
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
    </Helmet>
  );
};

export default Seo;

Seo.defaultProps = {
  title: undefined,
  description: undefined,
  image: undefined,
};
