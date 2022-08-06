import chroma from 'chroma-js';
import ntc from './ntc';

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

/**
 * Get hex from NTC lookup table or chroma conversion, if valid
 * @param color string which could be a chroma color or ntc color name
 * @returns the hex value for the given color, or undefined
 */
export const getColorHex = (color: string) => {
  const ntcLookup = ntc.lookup(color);
  const hex = ntcLookup
    ? `#${ntcLookup}`
    : chroma.valid(color)
    ? chroma(color).hex()
    : undefined;

  return hex;
};
