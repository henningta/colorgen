import React, { useEffect, useState } from 'react';
import { AppThemeProvider, ColorPicker, Seo } from '../components';
import { useColorScheme } from '@mui/joy/styles';
import { Container, Sheet, Switch, Typography } from '@mui/joy';
import { ColorContextProvider, useColorContext } from '../context';

type AppProps = {
  children: React.ReactNode;
};

const AppContent: React.FC<AppProps> = ({ children }) => {
  const { mode, setMode } = useColorScheme();
  const { colorHex, colorName, contrastText } = useColorContext();

  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const headerBg = !mounted
    ? undefined
    : mode === 'dark'
    ? 'common.black'
    : 'common.white';

  return (
    <>
      <Seo />
      <ColorPicker />
      <Sheet
        sx={{
          py: 2,
          backgroundColor: headerBg,
        }}
      >
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography level="h3">colorgen.io</Typography>
          <Switch
            componentsProps={{ input: { 'aria-label': 'dark mode' } }}
            startDecorator="Light"
            endDecorator="Dark"
            checked={mode === 'dark'}
            onChange={(e) => setMode(e.target.checked ? 'dark' : 'light')}
          />
        </Container>
      </Sheet>
      <Sheet
        sx={{
          width: '100%',
          height: 600,
          backgroundColor: colorHex,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ color: contrastText, opacity: 0.75 }} level="h5">
          {colorHex}
        </Typography>
        <Typography sx={{ color: contrastText }} level="h1">
          {colorName}
        </Typography>
      </Sheet>
      {children}
    </>
  );
};

const App: React.FC<AppProps> = ({ children }) => (
  <AppThemeProvider>
    <ColorContextProvider>
      <AppContent>{children}</AppContent>
    </ColorContextProvider>
  </AppThemeProvider>
);

export default App;
