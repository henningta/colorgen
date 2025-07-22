import React, { PropsWithChildren, useState } from 'react';
import { getColorHex, getColorName, getContrastColor } from '../utils';
import { createStore } from 'zustand';
import ColorContext, { ColorStore } from './ColorContextTypes';

type ColorStoreProviderProps = PropsWithChildren<{
  initialColor?: string;
}>;

export const ColorStoreProvider: React.FC<ColorStoreProviderProps> = ({
  children,
  initialColor = '#c41e3a',
}) => {
  const [store] = useState(() =>
    createStore<ColorStore>((set) => ({
      color: initialColor,
      setColor: (color: string) => {
        const colorHex = getColorHex(color);
        if (colorHex) {
          const colorName = getColorName(color);
          set({ colorHex });
          set({ contrastText: getContrastColor(colorHex) });
          set({ colorName });
        }

        set({ color });
      },
      colorHex: getColorHex(initialColor) ?? initialColor,
      colorName: getColorName(initialColor),
      contrastText: getContrastColor(initialColor),
    })),
  );

  // const throttleSetColorName = useMemo(
  //   () =>
  //     throttle((color: string) => {
  //       const colorName = getColorName(color);
  //       store.setState({ colorName });
  //     }, 50),
  //   [store],
  // );

  return (
    <ColorContext.Provider value={store}>{children}</ColorContext.Provider>
  );
};
