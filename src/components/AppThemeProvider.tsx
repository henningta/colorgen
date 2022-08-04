import { CssVarsProvider, extendTheme } from '@mui/joy';
import React from 'react';

export type AppThemeProviderProps = {
  children: React.ReactNode;
};

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  const shadowChannel = '40 40 40';

  const theme = extendTheme({
    colorSchemes: {
      dark: {
        shadowChannel,
      },
      light: {
        shadowChannel,
      },
    },
    fontFamily: {
      body: '"Noto Sans", var(--joy-fontFamily-fallback)',
      display: '"Noto Sans", var(--joy-fontFamily-fallback)',
      code: '"Noto Sans Mono", monospace',
      fallback: 'arial, sans-serif',
    },
    typography: {
      h1: {
        fontWeight: 300,
      },
      h2: {
        fontWeight: 300,
      },
      h3: {
        fontWeight: 300,
      },
      h4: {
        fontWeight: 300,
      },
      h5: {
        fontWeight: 300,
      },
      h6: {
        fontWeight: 300,
      },
    },
    components: {
      JoyButton: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
        },
      },
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
