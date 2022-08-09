import React, { useEffect } from 'react';
import {
  AppThemeProvider,
  ClientOnly,
  ColorBanner,
  ColorPicker,
  Fonts,
  Icon,
  Seo,
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
import { HelmetProvider } from 'react-helmet-async';

type AppProps = {
  children: React.ReactNode;
};

const AppContent: React.FC<AppProps> = ({ children }) => {
  const { mode, setMode } = useColorScheme();
  const { color, setColor } = useColorContext();
  const { bannerPosition, isMobile } = useAppContext();

  useEffect(() => {
    const rootCss = document.querySelector(':root') as HTMLElement;
    if (!rootCss) {
      return;
    }

    if (mode === 'dark') {
      rootCss.style.setProperty('--bg-color', 'var(--bg-color--dark)');
    } else {
      rootCss.style.setProperty('--bg-color', 'var(--bg-color--light)');
    }
  }, [mode]);

  const position = isMobile
    ? {
        bottom: 16,
      }
    : {
        top: 48,
      };

  return (
    <>
      <Fonts />
      <Seo />
      <ClientOnly>
        <Container
          sx={{
            ...position,
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 32,
          }}
          maxWidth="sm"
        >
          <ColorPicker
            value={color}
            onChange={setColor}
            sx={{ width: '100%', height: 56, pr: 2, boxShadow: 'md' }}
          />
        </Container>
      </ClientOnly>
      <Sheet sx={{ py: 2, zIndex: 24 }}>
        <Container
          maxWidth={false}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography level="h3">colorgen.io</Typography>
          </Link>
          <ClientOnly>
            <Switch
              componentsProps={{
                input: { 'aria-label': 'dark mode' },
                thumb: {
                  children: (
                    <Icon sx={{ color: 'common.white' }}>
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
      <ColorBanner />
      <Box
        sx={{
          position: 'relative',
          ml: bannerPosition === 'left' ? '400px' : 0,
          transition: '0.3s all ease-in-out',
        }}
      >
        {children}
      </Box>
    </>
  );
};

const App: React.FC<AppProps> = ({ children }) => (
  <HelmetProvider>
    <AppThemeProvider>
      <AppContextProvider>
        <ColorContextProvider>
          <AppContent>{children}</AppContent>
        </ColorContextProvider>
      </AppContextProvider>
    </AppThemeProvider>
  </HelmetProvider>
);

export default App;
