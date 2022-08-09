import { Box, BoxProps, Link, Typography } from '@mui/joy';
import React, { useEffect } from 'react';
import { Page } from '../components';
import { useAppContext } from '../context';

export type LibDetailsProps = BoxProps & {
  title: string;
  links?: { title: string; url: string }[];
};

const LibDetails: React.FC<LibDetailsProps> = ({ title, links }) => {
  const { isMobile } = useAppContext();

  return (
    <Box sx={{ mt: 4, overflow: 'hidden' }}>
      <Typography level={isMobile ? 'h5' : 'h4'} sx={{ mb: 1 }}>
        {title}
      </Typography>
      {links?.map((link) => (
        <Typography key={link.title}>
          {`${link.title}: `}
          <Link
            href={link.url}
            target="_blank"
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
          >
            {link.url}
          </Link>
        </Typography>
      ))}
    </Box>
  );
};

const About: React.FC = () => {
  const { setBannerHidden, isMobile } = useAppContext();

  useEffect(() => {
    setBannerHidden(true);

    return () => {
      setBannerHidden(false);
    };
  }, [setBannerHidden]);

  return (
    <Page sx={{ py: 4 }}>
      <Box>
        <Typography level={isMobile ? 'h4' : 'h3'}>Why colorgen.io?</Typography>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ mt: 3 }}>
            This app was created to fill the gaps seen in other color palette
            generators.
          </Typography>
          <Typography sx={{ mt: 3 }}>
            Our goal is to provide designers and developers with the options and
            flexibility needed to create any color palette imaginable.
          </Typography>
          <Typography sx={{ mt: 3 }}>
            This app is still in its infancy, so please stay tuned for more
            features and changes as we continue to improve it!
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 8 }}>
        <Typography level={isMobile ? 'h4' : 'h3'}>
          Awesome libraries used to build this app
        </Typography>
        <LibDetails
          title="chroma.js"
          links={[
            { title: 'API Docs', url: 'https://gka.github.io/chroma.js' },
            { title: 'GitHub', url: 'https://github.com/gka/chroma.js' },
          ]}
        />
        <LibDetails
          title="color-name-list"
          links={[
            { title: 'GitHub', url: 'https://github.com/meodai/color-names' },
          ]}
        />
        <LibDetails
          title="Gatsby"
          links={[
            {
              title: 'API Docs',
              url: 'https://www.gatsbyjs.com',
            },
            { title: 'GitHub', url: 'https://github.com/gatsbyjs/gatsby' },
          ]}
        />
        <LibDetails
          title="Joy UI"
          links={[
            {
              title: 'API Docs',
              url: 'https://mui.com/joy-ui/getting-started/overview',
            },
            { title: 'GitHub', url: 'https://github.com/mui/material-ui' },
          ]}
        />
        <LibDetails
          title="React"
          links={[
            {
              title: 'API Docs',
              url: 'https://reactjs.org',
            },
            { title: 'GitHub', url: 'https://github.com/facebook/react' },
          ]}
        />
        <LibDetails
          title="react-colorful"
          links={[
            {
              title: 'API Docs',
              url: 'https://omgovich.github.io/react-colorful',
            },
            {
              title: 'GitHub',
              url: 'https://github.com/omgovich/react-colorful',
            },
          ]}
        />
      </Box>
    </Page>
  );
};

export default About;
