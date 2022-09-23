import React from 'react';
import {
  AppThemeProvider,
  ClientOnly,
  ColorPicker,
  Fonts,
  Footer,
  Icon,
  Splash,
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
  const { nav, bannerPosition, isMobile, bannerHidden } = useAppContext();

  const position: SxProps<Theme> = isMobile
    ? {
        bottom: 16,
      }
    : {
        top: 36,
      };

  return (
    <>
      <Box
        sx={{
          minHeight: '100%',
          pb: '72px',
        }}
      >
        <ClientOnly>
          <Container
            sx={{
              display: nav.includes('home') ? 'none' : undefined,
              position: 'fixed',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 32,
              ...position,
            }}
            maxWidth="sm"
          >
            <ColorPicker value={color} onChange={setColor} />
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
        <Box
          sx={{
            position: 'relative',
            // ml: bannerPosition === 'left' ? '400px' : 0,
            // transition: '0.3s all ease-in-out',
            minHeight: '100%',
          }}
        >
          {isMobile && (
            <Container sx={{ py: 1, backgroundColor: 'common.white' }}>
              <Typography level="body2">
                The mobile version is currently a work-in-progress. Stay tuned
                for a new mobile experience coming soon.
              </Typography>
            </Container>
          )}
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
