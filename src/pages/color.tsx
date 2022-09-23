import React, { useEffect, useMemo } from 'react';
import chroma from 'chroma-js';
import { navigate } from 'gatsby';
import {
  ColorHarmonies,
  ColorInfo,
  CombinedPageProps,
  Page,
  TintsShades,
} from '../components';
import { useAppContext, useColorContext } from '../context';
import { debounce } from '../utils';

export type ColorProps = CombinedPageProps & {
  hex: string;
};

const Color: React.FC<ColorProps> = ({ hex, ...props }) => {
  const { colorName, colorHex, setColor } = useColorContext();
  const { setNav } = useAppContext();

  const debounceSetUrl = useMemo(
    () =>
      debounce(
        (hex: string) =>
          window.history.replaceState(
            undefined,
            '',
            `/color/${hex.substring(1)}`
          ),
        300
      ),
    []
  );

  useEffect(() => {
    if (!hex || !chroma.valid(hex)) {
      void navigate('/', { replace: true });
    }
  }, [hex]);

  useEffect(() => {
    setColor(`#${hex}`);
  }, [setColor, hex]);

  useEffect(() => {
    try {
      debounceSetUrl(colorHex);
    } catch (e) {
      /* ignore */
    }
  }, [debounceSetUrl, colorHex]);

  useEffect(() => {
    setNav(['color']);
  }, [setNav]);

  return (
    <Page
      {...props}
      title={colorHex}
      description={`Tints, shades, color harmonies, and more for hex code: ${colorHex}`}
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
