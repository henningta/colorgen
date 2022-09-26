import { graphql, useStaticQuery } from 'gatsby';

type SiteQuery = {
  site: {
    siteMetadata: Record<string, unknown> & {
      titleTemplate: string;
      description: string;
      siteUrl: string;
      siteName: string;
    };
  };
};

const useSiteMetadata = () => {
  const data = useStaticQuery<SiteQuery>(graphql`
    query {
      site {
        siteMetadata {
          titleTemplate
          description
          siteUrl
          siteName
        }
      }
    }
  `);

  return data.site.siteMetadata;
};

export default useSiteMetadata;
