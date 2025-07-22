import { Box, type BoxProps, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import { Page } from '../../components';
import { createFileRoute } from '@tanstack/react-router';

const url = 'https://www.colorgen.io';

const description =
  'Our goal is to provide designers and developers with the options and flexibility needed to create any color palette imaginable.';

export const Route = createFileRoute('/_app/about')({
  component: About,
  head: ({ match }) => ({
    meta: [
      { title: 'About · colorgen.io' },
      { name: 'description', content: description },

      // og
      { property: 'og:title', content: 'colorgen.io' },
      { property: 'og:description', content: description },
      { property: 'og:url', content: `${url}${match.pathname}` },
    ],
    links: [{ rel: 'canonical', href: `${url}${match.pathname}` }],
  }),
});

export type LibDetailsProps = BoxProps & {
  title: string;
  links?: { title: string; url: string }[];
};

const LibDetails: React.FC<LibDetailsProps> = ({ title, links }) => (
  <Box sx={{ mt: 4, overflow: 'hidden' }}>
    <Typography variant="h3" sx={{ mb: 1 }}>
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

function About() {
  return (
    <Page sx={{ py: 4 }}>
      <Box>
        <Typography variant="h2">Why colorgen.io?</Typography>
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
        <Typography variant="h2">Contributors:</Typography>
        <Stack sx={{ mt: 4 }}>
          <Typography>Travis Henning - owner/developer</Typography>
          <Typography sx={{ mt: 2 }}>Ryan Meloy - designer</Typography>
          <Typography>
            <Link
              href="https://meloyski.com"
              target="_blank"
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
            >
              meloyski.com
            </Link>
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h2">Awesome libraries we used:</Typography>
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
          title="MUI"
          links={[
            {
              title: 'API Docs',
              url: 'https://mui.com/material-ui/getting-started',
            },
            { title: 'GitHub', url: 'https://github.com/mui/material-ui' },
          ]}
        />
        <LibDetails
          title="React"
          links={[
            {
              title: 'API Docs',
              url: 'https://react.dev',
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
        <LibDetails
          title="Tanstack Start"
          links={[
            {
              title: 'API Docs',
              url: 'https://tanstack.com/start/latest',
            },
            { title: 'GitHub', url: 'https://github.com/tanstack/router' },
          ]}
        />
        <LibDetails
          title="Vite"
          links={[
            {
              title: 'API Docs',
              url: 'https://vite.dev/',
            },
            { title: 'GitHub', url: 'https://github.com/vitejs/vite' },
          ]}
        />
      </Box>
    </Page>
  );
}

export default About;
