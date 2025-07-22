import React from 'react';
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';

export type AppThemeProviderProps = {
  children: React.ReactNode;
};

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  const theme = createTheme({
    cssVariables: {
      colorSchemeSelector: '[data-mui-color-scheme="%s"]',
    },
    colorSchemes: {
      dark: {
        palette: {
          background: {
            default: '#1c1b22',
          },
          icon: {
            main: 'rgb(154, 160, 166)',
          },
        },
      },
      light: {
        palette: {
          background: {
            default: '#eeeff0',
          },
          icon: {
            main: 'rgb(95, 99, 104)',
          },
        },
      },
    },
    typography: {
      allVariants: {
        fontFamily: 'Manrope, arial, sans-serif',
      },
      display1: {
        fontWeight: 300,
        fontSize: '3rem',

        // @ts-expect-error don't care
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
      MuiAlert: {
        defaultProps: {
          color: 'info',
        },
        styleOverrides: {
          root: {
            paddingTop: 0,
            paddingBottom: 0,
            height: 48,
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
          disableTouchRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            fontWeight: 600,
            textTransform: 'none',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: 'Manrope, arial, sans-serif',
            code: 'monospace',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            '@media (min-width: 600px)': {
              paddingLeft: '32px',
              paddingRight: '32px',
            },
          },
        },
      },
      MuiIconButton: {
        defaultProps: {
          component: 'button',
          color: 'inherit',
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'always',
        },
        styleOverrides: {
          root: ({ ownerState, theme }) => ({
            color: theme.vars.palette.primary.main,
            textDecorationColor: theme.vars.palette.primary.main,

            '&:hover': {
              color: theme.vars.palette.primary.dark,
              textDecorationColor: theme.vars.palette.primary.dark,
            },

            ...(ownerState.underline === 'always' && {
              textDecoration: 'underline dotted',
            }),

            ...(ownerState.underline === 'hover' && {
              '&:hover': {
                textDecoration: 'underline dotted',
              },
            }),
          }),
        },
      },
      MuiSlider: {
        defaultProps: {
          color: 'info',
        },
      },
      MuiSwitch: {
        styleOverrides: {
          thumb: {
            '.Icon': {
              fontSize: 18,
            },
          },
        },
      },
      // MuiTypography: {
      //   defaultProps: {
      //     component: 'span',
      //   },
      // },
    },
  });

  const responsiveTheme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={responsiveTheme} defaultMode="system">
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
    </ThemeProvider>
  );
};

export default AppThemeProvider;
