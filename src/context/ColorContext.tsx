import chroma from 'chroma-js';
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { getContrastColor, ntc } from '../utils';

export type ColorContextType = {
  color: string;
  setColor: (color: string) => void;
  colorHex: string;
  colorName: string;
  contrastText: 'common.white' | 'common.black';
};

const defaultContext: ColorContextType = {
  color: 'Cardinal', // can be any user input
  colorHex: '#c41e3a',
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
  const [color, setColor] = useState(defaultContext.color);
  const [colorHex, setColorHex] = useState(defaultContext.colorHex);

  useLayoutEffect(() => {
    // Get hex from NTC lookup table or chroma conversion, if valid
    const ntcLookup = ntc.lookup(color);
    const hex = ntcLookup
      ? `#${ntcLookup}`
      : chroma.valid(color)
      ? chroma(color).hex()
      : undefined;

    if (hex) {
      setColorHex(hex);
    }
  }, [color]);

  const contrastText = colorHex ? getContrastColor(colorHex) : 'common.black';

  const colorName = colorHex ? ntc.name(colorHex)[1] : 'Invalid Color';

  const value = useMemo(
    () => ({
      color,
      setColor,
      colorHex,
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
