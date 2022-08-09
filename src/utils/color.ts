import chroma from 'chroma-js';
import colorNameList from 'color-name-list';
import nearestColor from 'nearest-color';
import CaseInsensitiveMap from './CaseInsensitiveMap';

export const getContrastColor = (
  bgColor: string
): 'common.white' | 'common.black' => {
  if (!chroma.valid(bgColor)) {
    return 'common.black';
  }

  const contrastWhite = chroma.contrast(bgColor, 'white');
  if (contrastWhite >= 3) {
    return 'common.white';
  }

  const contrastBlack = chroma.contrast(bgColor, chroma(9, 9, 13));
  return contrastWhite >= contrastBlack ? 'common.white' : 'common.black';
};

export const colorMap = (() =>
  colorNameList.reduce(
    (acc, x) => acc.set(x.name, x.hex),
    new CaseInsensitiveMap<string, string>()
  ))();

/**
 * Get hex from color-name-list or chroma conversion, if valid
 * @param color string which could be a chroma color or color name
 * @returns the hex value for the given color, or undefined
 */
export const getColorHex = (color: string) =>
  (chroma.valid(color) ? chroma(color).hex() : colorMap.get(color)) ||
  undefined;

export const getColorName = (() => {
  const colorMapObj = Object.fromEntries(colorMap);
  const from = nearestColor.from(colorMapObj);

  return (hex: string, capitalize = true) => {
    try {
      let name = from(hex).name;
      if (capitalize) {
        name = name
          .split(' ')
          .map((x) => `${x[0].toLocaleUpperCase()}${x.slice(1)}`)
          .join(' ');
      }
      return name;
    } catch (e) {
      return 'RGBA not yet supported';
    }
  };
})();
