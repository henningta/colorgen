import { CssVarsProvider, extendTheme } from '@mui/joy';
import React from 'react';

export type AppThemeProviderProps = {
  children: React.ReactNode;
};

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  const shadowChannel = '60 60 60';

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
      body: 'Manrope, var(--joy-fontFamily-fallback)',
      display: 'Manrope, var(--joy-fontFamily-fallback)',
      code: 'monospace',
      fallback: 'arial, sans-serif',
    },
    typography: {
      display1: {
        fontWeight: 300,
        fontSize: 96,
      },
      display2: {
        fontWeight: 300,
      },
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
      JoyContainer: {
        styleOverrides: {
          root: {
            '@media (min-width: 600px)': {
              paddingLeft: '32px',
              paddingRight: '32px',
            },
          },
        },
      },
      JoyLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: {
            color: 'var(--joy-palette-primary-solidBg)',
            borderBottom: '1px dotted var(--joy-palette-primary-solidBg)',

            '&:hover': {
              color: 'var(--joy-palette-primary-softColor)',
              borderBottom: '1px dotted var(--joy-palette-primary-softColor)',
            },
          },
        },
      },
      JoySwitch: {
        styleOverrides: {
          thumb: {
            '.Icon': {
              fontSize: 18,
            },
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
      JoyTypography: {
        defaultProps: {
          component: 'span',
        },
      },
    },
  });

  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
};

export default AppThemeProvider;
