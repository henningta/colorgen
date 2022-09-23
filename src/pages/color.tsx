import React, { useEffect } from 'react';
import chroma from 'chroma-js';
import { navigate } from 'gatsby';
import {
  ColorHarmonies,
  ColorInfo,
  CombinedPageProps,
  Page,
  TintsShades,
} from '../components';
import { useColorContext } from '../context';

export type ColorProps = CombinedPageProps & {
  hex: string;
};

const Color: React.FC<ColorProps> = ({ hex, ...props }) => {
  const { colorName, colorHex, setColor } = useColorContext();

  useEffect(() => {
    if (!hex || !chroma.valid(hex)) {
      void navigate('/', { replace: true });
    }
  }, [hex]);

  useEffect(() => {
    setColor(`#${hex}`);
  }, [setColor, hex]);

  return (
    <Page
      {...props}
      title={colorHex}
      // description={getColorDescription(colorHex)}
      maxWidth={false}
      sx={{ p: '0 !important' }}
    >
      <ColorInfo colorHex={colorHex} colorName={colorName} />
      <TintsShades colorHex={colorHex} colorName={colorName} />
      <ColorHarmonies colorHex={colorHex} />
    </Page>
  );
};

export default Color;
