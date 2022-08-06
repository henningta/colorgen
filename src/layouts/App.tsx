import React, { useEffect } from 'react';
import {
  AppThemeProvider,
  ClientOnly,
  ColorBanner,
  ColorPicker,
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
import { useMounted, useWindowSize } from '../utils';
import Card from '@mui/joy/Card';

type AppProps = {
  children: React.ReactNode;
};

const AppContent: React.FC<AppProps> = ({ children }) => {
  const { mode, setMode } = useColorScheme();
  const { color, setColor } = useColorContext();

  const { bannerPosition } = useAppContext();
  const mounted = useMounted();
  const [screenWidth] = useWindowSize();

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const rootCss = document.querySelector(':root') as HTMLElement;
    if (!rootCss) {
      return;
    }

    if (mode === 'dark') {
      rootCss.style.setProperty('--bg-color', 'var(--bg-color--dark)');
    } else {
      rootCss.style.setProperty('--bg-color', 'var(--bg-color--light)');
    }
  }, [mode, mounted]);

  const position =
    screenWidth && screenWidth >= 900
      ? {
          top: 48,
        }
      : {
          bottom: 16,
        };

  return (
    <>
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
          <Typography level="h3">colorgen.io</Typography>
          <ClientOnly>
            <Switch
              componentsProps={{ input: { 'aria-label': 'dark mode' } }}
              startDecorator="Light"
              endDecorator="Dark"
              checked={mode === 'dark'}
              onChange={(e) => setMode(e.target.checked ? 'dark' : 'light')}
            />
          </ClientOnly>
        </Container>
      </Sheet>
      <ColorBanner />
      <Box
        sx={{
          position: 'relative',
          ml: bannerPosition === 'top' ? 0 : '400px',
          transition: '0.3s all ease-in-out',
        }}
      >
        {children}
      </Box>
    </>
  );
};

const App: React.FC<AppProps> = ({ children }) => (
  <AppThemeProvider>
    <AppContextProvider>
      <ColorContextProvider>
        <AppContent>{children}</AppContent>
      </ColorContextProvider>
    </AppContextProvider>
  </AppThemeProvider>
);

export default App;
