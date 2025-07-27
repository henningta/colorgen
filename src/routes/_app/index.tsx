import {
  Box,
  type ButtonProps,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import chroma from 'chroma-js';
import React from 'react';
import { ColorPicker, Page, RouterButton } from '~/components';
import { ColorStoreProvider, useColorStore } from '~/context';
import { passSx } from '~/utils';
import { createFileRoute } from '@tanstack/react-router';
import { useShallow } from 'zustand/shallow';
import { ArrowRight } from 'lucide-react';

const url = 'https://www.colorgen.io';

export const Route = createFileRoute('/_app/')({
  component: IndexWrapper,
  loader: () => chroma.random().hex(),
  head: ({ match }) => ({
    meta: [{ property: 'og:url', content: `${url}${match.pathname}` }],
    links: [{ rel: 'canonical', href: `${url}${match.pathname}` }],
  }),
});

type ColorButtonProps = Pick<ButtonProps, 'sx'> & {
  colorHex: string;
  colorName: string;
  textColor: string;
};

const ColorButton: React.FC<ColorButtonProps> = ({
  colorHex,
  colorName,
  textColor,
  sx,
}) => (
  <RouterButton
    to="/color/$hex"
    params={{ hex: colorHex.substring(1) }}
    sx={[
      {
        whiteSpace: 'nowrap',
        color: textColor,

        '&:hover': {
          color: textColor === 'common.white' ? 'common.black' : 'common.white',
          backgroundColor: textColor,
        },
      },
      ...passSx(sx),
    ]}
    endIcon={<ArrowRight size={18} />}
  >
    See color info for &ldquo;{colorName}&rdquo;
  </RouterButton>
);

function IndexWrapper() {
  const serverHex = Route.useLoaderData();

  return (
    <ColorStoreProvider initialColor={serverHex}>
      <Index />
    </ColorStoreProvider>
  );
}

function Index() {
  const { color, setColor, colorName, colorHex, contrastText } = useColorStore(
    useShallow((state) => ({
      color: state.color,
      setColor: state.setColor,
      colorName: state.colorName,
      colorHex: state.colorHex,
      contrastText: state.contrastText,
    })),
  );

  return (
    <Page sx={{ p: '0 !important' }} maxWidth={false}>
      <Box style={{ height: '100%', backgroundColor: colorHex }}>
        <Stack
          sx={{
            minHeight: 'calc(100vh - 56px)',
            px: { xs: 0, sm: 8, lg: 16 },
            py: { xs: 4, sm: 8, lg: 16 },
          }}
        >
          <Container maxWidth="md" sx={{ m: 0 }}>
            <Stack gap={8}>
              <Container maxWidth="sm" disableGutters sx={{ m: 0 }}>
                <Stack gap={4}>
                  <Typography
                    component="h1"
                    variant="display1"
                    color={contrastText}
                  >
                    Welcome
                  </Typography>
                  <Typography color={contrastText}>
                    Welcome to colorgen.io. This tool was created to help
                    designers and developers find just the right color palette
                    they need to beautifully brand their next app.
                  </Typography>
                  <Typography color={contrastText}>
                    This app is a work-in-progress, so stay tuned for more
                    changes and features coming soon.
                  </Typography>
                </Stack>
              </Container>
              <Stack
                direction="row"
                alignItems="center"
                flexWrap="wrap"
                gap={4}
              >
                <ColorPicker
                  value={color}
                  onChange={setColor}
                  useHexPicker
                  sx={{ flex: 1, minWidth: 400 }}
                />
                <ColorButton
                  colorHex={colorHex}
                  colorName={colorName}
                  textColor={contrastText}
                  sx={{ ml: 'auto' }}
                />
              </Stack>
            </Stack>
          </Container>
        </Stack>
      </Box>
    </Page>
  );
}
