import { CssVarsProvider, extendTheme } from '@mui/joy';
import React from 'react';

export type AppThemeProviderProps = {
  children: React.ReactNode;
};

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  const theme = extendTheme({
    fontFamily: {
      body: '"Noto Sans", var(--joy-fontFamily-fallback)',
      display: '"Noto Sans", var(--joy-fontFamily-fallback)',
      code: '"Noto Sans Mono", monospace',
      fallback: 'arial, sans-serif',
    },
    components: {
      JoyTab: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
        },
      },
      JoyTabs: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  });

  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
};

export default AppThemeProvider;
