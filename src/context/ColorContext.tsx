import chroma from 'chroma-js';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  getColorHex,
  getColorName,
  getContrastColor,
  throttle,
} from '../utils';

export type ColorContextType = {
  color: string;
  setColor: (color: string) => void;
  setColorHex: (color: string) => void;
  colorHex: string;
  colorName: string;
  contrastText: 'common.white' | 'common.black';
};

const defaultContext: ColorContextType = {
  color: 'Cardinal', // can be any user input
  colorHex: '#c41e3a',
  setColorHex: () => undefined,
  setColor: () => undefined,
  colorName: 'Cardinal',
  contrastText: 'common.black',
};

const ColorContext = createContext(defaultContext);

export const useColorContext = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('Attempted to consume ColorContext without a provider.');
  }
  return context;
};

type ColorContextProviderProps = {
  children: React.ReactNode;
};

export const ColorContextProvider: React.FC<ColorContextProviderProps> = ({
  children,
}) => {
  // const initialColor =
  //   document.documentElement.getAttribute('data-random-color') ||
  //   chroma.random().hex();

  const initialColor = chroma.random().hex();
  const initialColorName = getColorName(initialColor);
  const initialContrastText = getContrastColor(initialColor);

  const [color, setColor] = useState(initialColorName);
  const [colorHex, setColorHex] = useState(initialColor);
  const [colorName, setColorName] = useState(initialColorName);
  const [contrastText, setContrastText] = useState(initialContrastText);

  const throttleSetColorName = useMemo(
    () => throttle((color: string) => setColorName(getColorName(color))),
    [setColorName]
  );

  useEffect(() => {
    const hex = getColorHex(color);

    if (hex) {
      setColorHex(hex);
      throttleSetColorName(color);
      setContrastText(getContrastColor(hex));
    }
  }, [color, throttleSetColorName]);

  const value = useMemo<ColorContextType>(
    () => ({
      color,
      setColor,
      colorHex,
      setColorHex,
      colorName,
      contrastText,
    }),
    [color, contrastText, colorHex, colorName]
  );

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

export default ColorContext;
