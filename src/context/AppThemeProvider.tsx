import React from 'react';
import {
  CssBaseline,
  GlobalStyles,
  CssVarsProvider as JoyCssVarsProvider,
  extendTheme as extendJoyTheme,
} from '@mui/joy';

export type AppThemeProviderProps = {
  children: React.ReactNode;
};

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  const theme = extendJoyTheme({
    colorSchemes: {
      dark: {
        palette: {
          background: {
            body: '#1c1b22',
          },
          icon: 'rgb(154, 160, 166)',
        },
      },
      light: {
        palette: {
          background: {
            body: '#eeeff0',
          },
          icon: 'rgb(95, 99, 104)',
        },
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
        fontSize: '3rem',

        // '@media (min-width:600px)': {
        //   fontSize: '4rem',
        // },
        // '@media (min-width:900px)': {
        //   fontSize: '4rem',
        // },
        '@media (min-width:1200px)': {
          fontSize: '5rem',
        },
        '@media (min-width:1536px)': {
          fontSize: '6rem',
        },
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
    },
    components: {
      JoyAlert: {
        defaultProps: {
          color: 'neutral',
        },
        styleOverrides: {
          root: {
            paddingTop: 0,
            paddingBottom: 0,
            height: 48,
          },
        },
      },
      JoyButton: {
        defaultProps: {
          color: 'neutral',
        },
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
      JoyIconButton: {
        defaultProps: {
          color: 'neutral',
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
      JoySlider: {
        defaultProps: {
          color: 'neutral',
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

  return (
    <JoyCssVarsProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: {
            overflowX: 'hidden',
          },
          body: {
            minHeight: '100%',
          },
        }}
      />
      {children}
    </JoyCssVarsProvider>
  );
};

export default AppThemeProvider;
