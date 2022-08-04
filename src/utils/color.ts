import chroma from 'chroma-js';

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
