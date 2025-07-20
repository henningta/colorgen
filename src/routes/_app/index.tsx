import { Box, type ButtonProps, Container, Stack, Typography } from '@mui/joy';
import chroma from 'chroma-js';
import React from 'react';
import { ColorPicker, Icon, Page, RouterButton } from '../../components';
import {
  ColorContextProvider,
  useAppContext,
  useColorContext,
} from '../../context';
import { passSx } from '../../utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/')({
  component: IndexWrapper,
  loader: () => chroma.random().hex(),
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
    variant="plain"
    sx={[
      (theme) => ({
        whiteSpace: 'nowrap',
        color: textColor,

        '&:hover': {
          color: textColor === 'common.white' ? 'common.black' : 'common.white',
          backgroundColor: textColor,
        },

        [theme.breakpoints.down('md')]: {
          ml: 'auto',
        },
      }),
      ...passSx(sx),
    ]}
    endDecorator={<Icon sx={{ color: 'inherit' }}>arrow_forward</Icon>}
  >
    See color info for &ldquo;{colorName}&rdquo;
  </RouterButton>
);

function IndexWrapper() {
  const serverHex = Route.useLoaderData();

  return (
    <ColorContextProvider initialColor={serverHex}>
      <Index />
    </ColorContextProvider>
  );
}

function Index() {
  const { isMobile } = useAppContext();
  const { color, setColor, colorName, colorHex, contrastText } =
    useColorContext();

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
            <Typography level="display1" textColor={contrastText}>
              Welcome
            </Typography>
            <Stack sx={{ mt: 4 }}>
              <Typography fontWeight={300} textColor={contrastText}>
                Welcome to colorgen.io. This tool was created to help designers
                and developers find just the right color palette they need to
                beautifully brand their next app.
              </Typography>
              <Typography
                sx={{ mt: 4 }}
                fontWeight={300}
                textColor={contrastText}
              >
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
            <Container
              maxWidth={false}
              sx={{
                m: 0,
                mt: 6,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ColorPicker
                value={color}
                onChange={setColor}
                useHexPicker
                sx={{ maxWidth: 536, my: 2 }}
              />
              <ColorButton
                colorHex={colorHex}
                colorName={colorName}
                textColor={contrastText}
                sx={{ ml: 2 }}
              />
            </Container>
          )}
        </Stack>
      </Box>
    </Page>
  );
}
