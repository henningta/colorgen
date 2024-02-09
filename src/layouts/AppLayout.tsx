import React from 'react';
import {
  ClientOnly,
  ColorPicker,
  Footer,
  Icon,
  MobileColorMenu,
  RouterLink,
} from '../components';
import {
  Box,
  Container,
  IconButton,
  Sheet,
  Stack,
  Typography,
  useColorScheme as useJoyColorScheme,
} from '@mui/joy';
import { useAppContext, useColorContext } from '../context';

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { mode, setMode } = useJoyColorScheme();
  const { color, setColor } = useColorContext();
  const { nav, isMobile } = useAppContext();

  const hasColorMenu =
    isMobile && !nav.includes('home') && !nav.includes('about');

  return (
    <>
      <Box
        className={hasColorMenu ? 'has-color-menu' : undefined}
        sx={{
          minHeight: '100%',
          pb: '72px',

          '&.has-color-menu': {
            pb: '152px',
          },
        }}
      >
        <Sheet sx={{ zIndex: 24 }}>
          <Container
            maxWidth={false}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '64px',
            }}
          >
            <RouterLink
              href="/"
              sx={{
                color: 'inherit',
                borderBottom: 'none',

                '&:hover': {
                  color: 'inherit',
                  borderBottom: 'none',
                },
              }}
            >
              <Typography fontSize={30} fontWeight={300}>
                colorgen.io
              </Typography>
            </RouterLink>
            <ClientOnly>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ '.Icon': { fontSize: 20 } }}
              >
                <IconButton
                  size="sm"
                  variant={mode === 'dark' ? 'solid' : 'plain'}
                  onClick={() => setMode('dark')}
                >
                  <Icon sx={{ color: mode === 'dark' ? 'white' : undefined }}>
                    dark_mode
                  </Icon>
                </IconButton>
                <IconButton
                  size="sm"
                  variant={mode === 'system' ? 'solid' : 'plain'}
                  onClick={() => setMode('system')}
                >
                  <Icon sx={{ color: mode === 'system' ? 'white' : undefined }}>
                    computer
                  </Icon>
                </IconButton>
                <IconButton
                  size="sm"
                  variant={mode === 'light' ? 'solid' : 'plain'}
                  onClick={() => setMode('light')}
                >
                  <Icon sx={{ color: mode === 'light' ? 'white' : undefined }}>
                    light_mode
                  </Icon>
                </IconButton>
              </Stack>
              {/* <Switch
                size="lg"
                slotProps={{
                  input: { 'aria-label': 'dark mode' },
                  thumb: {
                    children: (
                      <Icon style={{ color: 'white' }}>
                        {mode === 'dark' ? 'dark_mode' : 'light_mode'}
                      </Icon>
                    ),
                  },
                }}
                checked={mode === 'dark'}
                onChange={(e) => {
                  setJoyMode(e.target.checked ? 'dark' : 'light');
                  setMuiMode(e.target.checked ? 'dark' : 'light');
                }}
                sx={{
                  '--Switch-thumbBackground': 'transparent',

                  [`&.${switchClasses.checked}`]: {
                    '--Switch-thumbBackground': 'transparent',
                  },
                }}
              /> */}
            </ClientOnly>
          </Container>
        </Sheet>
        <Box sx={{ position: 'relative', minHeight: '100%' }}>
          {children}
          <ClientOnly>
            <Box
              sx={(theme) => ({
                width: '100%',
                maxWidth: 600,
                px: 2,
                display:
                  nav.includes('home') || nav.includes('about') || isMobile
                    ? 'none'
                    : undefined,
                position: 'fixed',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: theme.zIndex.popup,
                transition: 'all 150ms ease-in-out',
                top: 36,
              })}
            >
              <ColorPicker
                value={color}
                onChange={setColor}
                useHexPicker={!isMobile}
              />
            </Box>
          </ClientOnly>
        </Box>
      </Box>
      <Footer />
      <ClientOnly>
        {isMobile && !nav.includes('home') && !nav.includes('about') && (
          <MobileColorMenu />
        )}
      </ClientOnly>
    </>
  );
};

export default AppLayout;
