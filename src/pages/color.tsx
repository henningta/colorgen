import React, { useEffect, useMemo } from 'react';
import chroma from 'chroma-js';
import { HeadProps, navigate } from 'gatsby';
import {
  ColorHarmonies,
  ColorInfo,
  CombinedPageProps,
  Page,
  Seo,
  TintsShades,
  useSiteMetadata,
} from '../components';
import { useAppContext, useColorContext } from '../context';
import debounce from 'lodash.debounce';

export type ColorProps = CombinedPageProps & {
  hex: string;
};

const Color: React.FC<ColorProps> = ({ hex, ...props }) => {
  const { colorName, colorHex, setColor } = useColorContext();
  const { setNav } = useAppContext();
  const { titleTemplate } = useSiteMetadata();

  const debounceSetUrl = useMemo(
    () =>
      debounce((hex: string) => {
        window.history.replaceState(
          undefined,
          '',
          `/color/${hex.substring(1)}`
        );
        document.title = titleTemplate.replace('%s', hex);
      }, 300),
    [titleTemplate]
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
    <Page {...props} maxWidth={false} sx={{ p: '0 !important' }}>
      <ColorInfo colorHex={colorHex} colorName={colorName} />
      <TintsShades colorHex={colorHex} colorName={colorName} />
      <ColorHarmonies colorHex={colorHex} />
    </Page>
  );
};

export const Head: React.FC<HeadProps> = ({ params }) => (
  <Seo
    title={`#${params.hex}`}
    description={`Tints, shades, and color info for hex code: #${params.hex}`}
  />
);

export default Color;
