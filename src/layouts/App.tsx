import React, { useEffect } from 'react';
import { AppThemeProvider, ColorPicker, Seo } from '../components';
import { useColorScheme } from '@mui/joy/styles';
import { Container, Sheet, Switch, Typography } from '@mui/joy';
import { ColorContextProvider } from '../context';

type AppProps = {
  children: React.ReactNode;
};

const AppContent: React.FC<AppProps> = ({ children }) => {
  const { mode, setMode } = useColorScheme();

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

  return (
    <>
      <Seo />
      <ColorPicker />
      <Sheet
        sx={{
          py: 2,
          backgroundColor: mode === 'dark' ? 'common.black' : 'common.white',
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
