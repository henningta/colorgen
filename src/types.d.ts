declare module '@mui/joy/styles' {
  interface Palette {
    icon: string;
  }
}

declare module 'color-name-list' {
  type ColorName = { name: string; hex: string };
  type ColorNameList = ColorName[];
  const colorNameList: ColorNameList;
  export = colorNameList;
}

declare module 'nearest-color' {
  type NearestColor = {
    from: (colorMap: Record<string, string>) => (hex: string) => {
      name: string;
    };
  };

  const nearestColor: NearestColor;

  export = nearestColor;
}

declare module 'nearest-pantone' {
  type PantoneColor = {
    pantone: string;
    name: string;
    hex: string;
  };

  type NearestPantone = {
    getClosestColor: (hex: string) => PantoneColor;
  };

  const nearestPantone: NearestPantone;

  export = nearestPantone;
}
