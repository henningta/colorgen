declare module 'color-name-list' {
  type ColorName = { name: string; hex: string };
  type ColorNameList = ColorName[];
  const colornames: ColorNameList;
  export { colornames };
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
    getClosestColor: (hex: string) => PantoneColor | undefined;
  };

  const nearestPantone: NearestPantone;

  export = nearestPantone;
}
