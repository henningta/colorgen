import React, { useEffect, useMemo, useState } from 'react';
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
import { throttle } from '../utils';

export type ColorProps = CombinedPageProps & {
  hex: string;
};

const Color: React.FC<ColorProps> = ({ hex, ...props }) => {
  const { colorName, colorHex, setColor } = useColorContext();

  const [renderHex, setRenderHex] = useState(colorHex);

  const throttleSetRenderHex = useMemo(
    () => throttle((hex: string) => setRenderHex(hex), 100),
    []
  );

  useEffect(() => {
    if (!hex || !chroma.valid(hex)) {
      void navigate('/', { replace: true });
    }
  }, [hex]);

  useEffect(() => {
    setColor(hex);
  }, [setColor, hex]);

  useEffect(() => {
    throttleSetRenderHex(colorHex);
  }, [throttleSetRenderHex, colorHex]);

  return (
    <Page
      {...props}
      title={colorHex}
      // description={getColorDescription(colorHex)}
      maxWidth={false}
      sx={{ p: '0 !important' }}
    >
      <ColorInfo colorHex={colorHex} colorName={colorName} />
      <TintsShades colorHex={renderHex} colorName={colorName} />
      <ColorHarmonies colorHex={renderHex} />
    </Page>
  );
};

export default Color;
