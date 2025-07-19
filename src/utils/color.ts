import chroma from 'chroma-js';
import { colornames } from 'color-name-list';
import nearestColor from 'nearest-color';
import CaseInsensitiveMap from './CaseInsensitiveMap';

// chroma-js removed this export? :(
type InterpolationMode =
  | 'hcl'
  | 'hsi'
  | 'hsl'
  | 'hsv'
  | 'lab'
  | 'lch'
  | 'lrgb'
  | 'oklab'
  | 'oklch'
  | 'rgb';

const secretColors = [
  { name: 'Amanda', hex: '#b76e79' },
  { name: 'Susan', hex: '#7b6660' },
  { name: 'Xinyi', hex: '#623ca0' },
];

export const getContrastColor = (
  bgColor: string,
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
  colornames.reduce(
    (acc, x) => acc.set(x.name, x.hex),
    new CaseInsensitiveMap<string, string>(),
  ))();

/**
 * Get hex from color-name-list or chroma conversion, if valid
 * @param color string which could be a chroma color or color name
 * @returns the hex value for the given color, or undefined
 */
export const getColorHex = (color: string) => {
  const secret = secretColors.find(
    (x) => x.name.toLocaleLowerCase() === color.toLocaleLowerCase(),
  );

  if (secret) {
    return secret.hex;
  }

  return (
    (chroma.valid(color) ? chroma(color).hex() : colorMap.get(color)) ||
    undefined
  );
};

export const getColorName = (() => {
  const colorMapObj = Object.fromEntries(colorMap);
  const from = nearestColor.from(colorMapObj);

  return (color: string, capitalize = true) => {
    const secret = secretColors.find(
      (x) => x.name.toLocaleLowerCase() === color.toLocaleLowerCase(),
    );

    if (secret) {
      return secret.name;
    }

    try {
      let name = colorMap.has(color) ? color : from(color).name;
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

export const getTints = (
  colorHex: string,
  whitePoint = '#fff',
  amount = 5,
  mode: InterpolationMode = 'rgb',
) =>
  [...Array(amount).keys()].map((x) => ({
    id: x,
    color: chroma.mix(colorHex, whitePoint, (amount - x) / amount, mode),
  }));

export const getShades = (
  colorHex: string,
  blackPoint = '#000',
  amount = 5,
  mode: InterpolationMode = 'rgb',
) =>
  [...Array(amount).keys()].map((x) => ({
    id: x,
    color: chroma.mix(colorHex, blackPoint, (x + 1) / amount, mode),
  }));

export const stripColorName = (color: string, toLower = true) => {
  if (!color?.length) {
    return undefined;
  }
  const stripped = color.replace(/\W/g, '');
  return toLower ? stripped.toLocaleLowerCase() : stripped;
};

// export const generateHexImage = async (
//   hex: string,
//   width = 80,
//   height = 80
// ) => {
//   if (!chroma.valid(hex)) {
//     return undefined;
//   }

//   hex = chroma(hex).hex();

//   // const canvas = createCanvas(width, height);
//   const canvas = document.createElement('canvas');
//   const context = canvas.getContext('2d');
//   if (!context) {
//     return undefined;
//   }

//   context.fillStyle = hex;
//   context.fillRect(0, 0, width, height);

//   // const buffer = canvas.toBuffer('image/png');
//   // await fs.promises.writeFile(`./preview/${hex.substring(1)}.png`, buffer);
// };
