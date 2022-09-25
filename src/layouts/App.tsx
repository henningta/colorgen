import React from 'react';
import {
  AppThemeProvider,
  ClientOnly,
  ColorPicker,
  Fonts,
  Footer,
  Icon,
  MobileColorMenu,
  Splash,
} from '../components';
import {
  Box,
  Container,
  Sheet,
  Switch,
  Typography,
  useColorScheme,
} from '@mui/joy';
import {
  AppContextProvider,
  ColorContextProvider,
  useAppContext,
  useColorContext,
} from '../context';
import { Link } from 'gatsby';

type AppProps = {
  children: React.ReactNode;
};

const AppContent: React.FC<AppProps> = ({ children }) => {
  const { mode, setMode } = useColorScheme();
  const { color, setColor } = useColorContext();
  const { nav, isMobile } = useAppContext();

  return (
    <>
      <Box
        sx={(theme) => ({
          minHeight: '100%',
          pb: '160px',

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
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography fontSize={30} fontWeight={300}>
                colorgen.io
              </Typography>
            </Link>
            <ClientOnly>
              <Switch
                componentsProps={{
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
                onChange={(e) => setMode(e.target.checked ? 'dark' : 'light')}
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
              sx={{
                width: '100%',
                maxWidth: 600,
                px: 2,
                display: nav.includes('home') || isMobile ? 'none' : undefined,
                position: 'fixed',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 32,
                transition: 'all 150ms ease-in-out',
                top: 36,
              }}
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
        ≈{isMobile && !nav.includes('home') && <MobileColorMenu />}
      </ClientOnly>
    </>
  );
};

const App: React.FC<AppProps> = ({ children }) => (
  <>
    <Splash />
    <Fonts />
    <AppThemeProvider>
      <AppContextProvider>
        <ColorContextProvider>
          <AppContent>{children}</AppContent>
        </ColorContextProvider>
      </AppContextProvider>
    </AppThemeProvider>
  </>
);

export default App;
