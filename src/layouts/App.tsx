import React from 'react';
import {
  AppThemeProvider,
  ClientOnly,
  ColorBanner,
  ColorPicker,
  Fonts,
  Footer,
  Icon,
} from '../components';
import {
  Box,
  Container,
  Sheet,
  Switch,
  Theme,
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
import { SxProps } from '@mui/system';

type AppProps = {
  children: React.ReactNode;
};

const AppContent: React.FC<AppProps> = ({ children }) => {
  const { mode, setMode } = useColorScheme();
  const { color, setColor } = useColorContext();
  const { bannerPosition, isMobile, bannerHidden } = useAppContext();

  const position: SxProps<Theme> = isMobile
    ? {
        bottom: 16,
      }
    : {
        top: 48,
      };

  return (
    <>
      <Box sx={{ minHeight: '100%', pb: '72px' }}>
        <ClientOnly>
          <Container
            sx={{
              display: bannerHidden ? 'none' : undefined,
              position: 'fixed',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 32,
              ...position,
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
      </Box>
      <Footer
        sx={{
          ml: bannerPosition === 'top' ? 0 : '400px',
          mb: isMobile && !bannerHidden ? '88px' : 0,
        }}
      />
    </>
  );
};

const App: React.FC<AppProps> = ({ children }) => (
  <>
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
