declare module '@mui/material/styles' {
  // eslint-disable-next-line
  interface Palette {
    icon: Palette['primary'];
  }

  // eslint-disable-next-line
  interface PaletteOptions {
    icon?: PaletteOptions['primary'];
  }

  // eslint-disable-next-line
  interface TypographyVariants {
    display1: React.CSSProperties;
  }

  // eslint-disable-next-line
  interface TypographyVariantsOptions {
    display1: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  // eslint-disable-next-line
  interface TypographyPropsVariantOverrides {
    display1: true;
  }
}

export {};
