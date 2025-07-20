import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getColorHex, getColorName, getContrastColor } from '../utils';
import throttle from 'lodash.throttle';

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

type ColorContextProviderProps = PropsWithChildren<{
  initialColor?: string;
}>;

export const ColorContextProvider: React.FC<ColorContextProviderProps> = ({
  children,
  initialColor = '#c41e3a',
}) => {
  const initialColorName = getColorName(initialColor);
  const initialContrastText = getContrastColor(initialColor);

  const [color, setColor] = useState(initialColor);
  const [colorHex, setColorHex] = useState(initialColor);
  const [colorName, setColorName] = useState(initialColorName);
  const [contrastText, setContrastText] = useState(initialContrastText);

  const throttleSetColorName = useMemo(
    () => throttle((color: string) => setColorName(getColorName(color)), 50),
    [setColorName],
  );

  useEffect(() => {
    // if (!color) {
    //   return;
    // }

    // const secret = secretColors.find(
    //   (x) => x.name.toLocaleLowerCase() === color.toLocaleLowerCase()
    // );
    // if (secret) {
    //   setColorHex(secret.hex);
    //   throttleSetColorName(secret.name);
    //   setContrastText(getContrastColor(secret.hex));
    //   return;
    // }

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
    [color, contrastText, colorHex, colorName],
  );

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

export default ColorContext;
