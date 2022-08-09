declare module 'nearest-color' {
  type NearestColor = {
    from: (colorMap: Record<string, string>) => (hex: string) => {
      name: string;
    };
  };

  const nearestColor: NearestColor;

  export = nearestColor;
}
