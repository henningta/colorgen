import React from 'react';
import {
  ClientOnly,
  ColorPicker,
  Footer,
  Icon,
  MobileColorMenu,
} from '../components';
import {
  Box,
  Container,
  Sheet,
  Switch,
  Typography,
  useColorScheme as useJoyColorScheme,
} from '@mui/joy';
import { useColorScheme as useMuiColorScheme } from '@mui/material';
import { useAppContext, useColorContext } from '../context';
import Link from 'next/link';

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
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Typography
                component="a"
                fontSize={30}
                fontWeight={300}
                sx={{ cursor: 'pointer' }}
              >
                colorgen.io
              </Typography>
            </Link>
            <ClientOnly>
              <Switch
                slotProps={{
                  input: { 'aria-label': 'dark mode' },
                  thumb: {
                    children: (
                      <Icon style={{ color: 'white' }} fill>
                        {mode === 'dark' ? 'brightness_4' : 'brightness_7'}
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
                  '--Switch-thumb-background': 'transparent',

                  '&.Joy-checked': {
                    '--Switch-thumb-background': 'transparent',
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
                display: nav.includes('home') || isMobile ? 'none' : undefined,
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
        {isMobile && !nav.includes('home') && <MobileColorMenu />}
      </ClientOnly>
    </>
  );
};

export default AppLayout;
