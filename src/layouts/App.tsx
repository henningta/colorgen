import React from 'react';
import { AppThemeProvider, Seo } from '../components';
import { useColorScheme } from '@mui/joy/styles';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import Container from '@mui/joy/Container';

type AppProps = {
  children: React.ReactNode;
};

const AppContent: React.FC<AppProps> = ({ children }) => {
  const { mode, setMode } = useColorScheme();

  return (
    <>
      <Seo />
      <Container
        sx={{
          py: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography level="h1">colorgen.io</Typography>
        <Switch
          componentsProps={{ input: { 'aria-label': 'dark mode' } }}
          startDecorator={'Light'}
          endDecorator={'Dark'}
          checked={mode === 'dark'}
          onChange={(e) => setMode(e.target.checked ? 'dark' : 'light')}
        />
      </Container>
      {children}
    </>
  );
};

const App: React.FC<AppProps> = ({ children }) => (
  <AppThemeProvider>
    <AppContent>{children}</AppContent>
  </AppThemeProvider>
);

export default App;
