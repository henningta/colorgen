import { PropsWithChildren } from 'react';
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';
import {
  CircleAlert,
  CircleCheckBig,
  Info,
  TriangleAlert,
  X,
} from 'lucide-react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

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
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 300,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 300,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 300,
      letterSpacing: '-0.025em',
    },
  },
  components: {
    MuiAlert: {
      defaultProps: {
        severity: 'info',
        iconMapping: {
          error: <CircleAlert size={22} />,
          info: <Info size={22} />,
          success: <CircleCheckBig size={22} />,
          warning: <TriangleAlert size={22} />,
        },
        slots: {
          closeIcon: () => <X size={20} />,
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
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        grouped: {
          margin: 0.5,
          border: 0,
          borderRadius: 6,

          variants: [
            {
              props: { disabled: true },
              style: {
                border: '0 !important',
              },
            },
          ],
        },
      },
    },
  },
});

const responsiveTheme = responsiveFontSizes(theme);

export type AppThemeProviderProps = PropsWithChildren;

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  const emotionCache = createCache({ key: 'css' });

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={responsiveTheme}>
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
    </CacheProvider>
  );
};

export default AppThemeProvider;
