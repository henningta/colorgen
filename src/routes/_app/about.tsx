import { Box, type BoxProps, Link, Stack, Typography } from '@mui/joy';
import React, { useEffect } from 'react';
import { Page } from '../../components';
import { useAppContext } from '../../context';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/about')({
  component: About,
});

export type LibDetailsProps = BoxProps & {
  title: string;
  links?: { title: string; url: string }[];
};

const LibDetails: React.FC<LibDetailsProps> = ({ title, links }) => (
  <Box sx={{ mt: 4, overflow: 'hidden' }}>
    <Typography level="title-lg" sx={{ mb: 1 }}>
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
    <Page
      title="About"
      description="Our goal is to provide designers and developers with the options and
      flexibility needed to create any color palette imaginable."
      sx={{ py: 4 }}
    >
      <Box>
        <Typography level="h2">Why colorgen.io?</Typography>
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
        <Typography level="h2">Contributors:</Typography>
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
        <Typography level="h2">Awesome libraries we used:</Typography>
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
          title="Next.js"
          links={[
            {
              title: 'API Docs',
              url: 'https://nextjs.org/docs/getting-started',
            },
            { title: 'GitHub', url: 'https://github.com/vercel/next.js' },
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
}

export default About;
