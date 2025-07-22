import { createContext } from 'react';
import { StoreApi } from 'zustand';

export type ColorStore = {
  color: string;
  setColor: (color: string) => void;
  colorHex: string;
  colorName: string;
  contrastText: 'common.white' | 'common.black';
};

const ColorContext = createContext<StoreApi<ColorStore>>(
  {} as StoreApi<ColorStore>,
);

export default ColorContext;
