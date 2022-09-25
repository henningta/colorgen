import React from 'react';
import {
  colors,
  CssVarsProvider,
  extendTheme as extendJoyTheme,
} from '@mui/joy';
import {
  CssBaseline,
  experimental_extendTheme as extendMuiTheme,
} from '@mui/material';
import { deepmerge } from '@mui/utils';

export type AppThemeProviderProps = {
  children: React.ReactNode;
};

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  const shadowChannel = '60 60 60';

  const muiTheme = extendMuiTheme({
    cssVarPrefix: 'joy',
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: colors.blue[500],
          },
          grey: colors.grey,
          error: {
            main: colors.red[500],
          },
          info: {
            main: colors.purple[500],
          },
          success: {
            main: colors.green[500],
          },
          warning: {
            main: colors.yellow[200],
          },
          common: {
            white: '#fff',
            black: '#09090d',
          },
          divider: colors.grey[200],
          text: {
            primary: colors.grey[800],
            secondary: colors.grey[600],
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: colors.blue[600],
          },
          grey: colors.grey,
          error: {
            main: colors.red[600],
          },
          info: {
            main: colors.purple[600],
          },
          success: {
            main: colors.green[600],
          },
          warning: {
            main: colors.yellow[300],
          },
          common: {
            white: '#fff',
            black: '#09090d',
          },
          divider: colors.grey[800],
          text: {
            primary: colors.grey[100],
            secondary: colors.grey[300],
          },
        },
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '.react-colorful__pointer': {
            transition: '150ms all cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: '#fff',
            color: '#09090d',
          },
        },
      },
    },
  });

  const joyTheme = extendJoyTheme({
    colorSchemes: {
      dark: {
        shadowChannel,
        palette: {
          icon: 'rgb(154, 160, 166)',
        },
      },
      light: {
        shadowChannel,
        palette: {
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
        fontSize: '1.5rem',

        '@media (min-width:1200px)': {
          fontSize: '2rem',
        },
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

  const theme = deepmerge(muiTheme, joyTheme);

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
};

export default AppThemeProvider;
