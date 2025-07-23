import {
  Box,
  type ButtonProps,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import chroma from 'chroma-js';
import React from 'react';
import { ColorPicker, Page, RouterButton } from '../../components';
import {
  ColorStoreProvider,
  useAppContext,
  useColorStore,
} from '../../context';
import { passSx } from '../../utils';
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
  const { isMobile } = useAppContext();
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
          sx={(theme) => ({
            minHeight: 'calc(100vh - 56px)',
            py: 4,
            px: 0,

            [theme.breakpoints.up('sm')]: {
              py: 8,
              px: 8,
            },

            [theme.breakpoints.up('lg')]: {
              py: 16,
              px: 16,
            },
          })}
        >
          <Container maxWidth="sm" sx={{ m: 0 }}>
            <Typography variant="display1" color={contrastText}>
              Welcome
            </Typography>
            <Stack sx={{ mt: 4 }}>
              <Typography color={contrastText}>
                Welcome to colorgen.io. This tool was created to help designers
                and developers find just the right color palette they need to
                beautifully brand their next app.
              </Typography>
              <Typography color={contrastText} sx={{ mt: 4 }}>
                This app is a work-in-progress, so stay tuned for more changes
                and features coming soon.
              </Typography>
              {isMobile && (
                <>
                  <ColorPicker
                    value={color}
                    onChange={setColor}
                    useHexPicker
                    sx={{ mt: 8 }}
                  />
                  <ColorButton
                    colorHex={colorHex}
                    colorName={colorName}
                    textColor={contrastText}
                    sx={{ mt: 4, ml: 'auto' }}
                  />
                </>
              )}
            </Stack>
          </Container>
          {!isMobile && (
            <Container maxWidth={false} sx={{ m: 0, mt: 6 }}>
              <Stack direction="row" alignItems="center">
                <ColorPicker
                  value={color}
                  onChange={setColor}
                  useHexPicker
                  sx={{ maxWidth: 600, my: 2 }}
                />
                <Box sx={{ ml: 2 }}>
                  <ColorButton
                    colorHex={colorHex}
                    colorName={colorName}
                    textColor={contrastText}
                  />
                </Box>
              </Stack>
            </Container>
          )}
        </Stack>
      </Box>
    </Page>
  );
}
