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
  Sheet,
  Switch,
  Typography,
  switchClasses,
  useColorScheme as useJoyColorScheme,
} from '@mui/joy';
import { useColorScheme as useMuiColorScheme } from '@mui/material';
import { useAppContext, useColorContext } from '../context';

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { mode, setMode: setJoyMode } = useJoyColorScheme();
  const { setMode: setMuiMode } = useMuiColorScheme();
  const { color, setColor } = useColorContext();
  const { nav, isMobile } = useAppContext();

  return (
    <>
      <Box
        sx={(theme) => ({
          minHeight: '100%',
          pb: '152px',

          [theme.breakpoints.up('md')]: {
            pb: '72px',
          },
        })}
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
              <Switch
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
              />
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
