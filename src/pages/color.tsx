import React, { useEffect, useMemo } from 'react';
import chroma from 'chroma-js';
import { GetServerData, navigate } from 'gatsby';
import {
  ColorHarmonies,
  ColorInfo,
  CombinedPageProps,
  Page,
  TintsShades,
  useSiteMetadata,
} from '../components';
import { useAppContext, useColorContext } from '../context';
import debounce from 'lodash.debounce';

type ServerDataProps = {
  hex: string;
};

export type ColorProps = CombinedPageProps<
  object,
  object,
  unknown,
  ServerDataProps
>;

const Color: React.FC<ColorProps> = ({ serverData, ...props }) => {
  const { hex: serverHex } = serverData;

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
    if (!serverHex || !chroma.valid(serverHex)) {
      void navigate('/', { replace: true });
    } else {
      setColor(serverHex);
    }
  }, [setColor, serverHex]);

  useEffect(() => {
    try {
      if (serverHex && chroma.valid(serverHex)) {
        debounceSetUrl(colorHex);
      }
    } catch (e) {
      /* ignore */
    }
  }, [debounceSetUrl, serverHex, colorHex]);

  useEffect(() => {
    setNav(['color']);
  }, [setNav]);

  return (
    <Page
      {...props}
      title={serverData.hex}
      description={`Tints, shades, and color info for hex code: ${serverData.hex}`}
      serverData={serverData}
      maxWidth={false}
      sx={{ p: '0 !important' }}
    >
      <ColorInfo colorHex={colorHex} colorName={colorName} />
      <TintsShades colorHex={colorHex} colorName={colorName} />
      <ColorHarmonies colorHex={colorHex} />
    </Page>
  );
};

export const getServerData: GetServerData<ServerDataProps> = ({ params }) => {
  const { hex } = params as { hex: string };

  return Promise.resolve({
    props: {
      hex: `#${hex}`,
    },
  });
};

// export const Head: React.FC<HeadProps> = ({ params, data, pageContext }) => {
//   console.log(data);
//   console.log(pageContext);
//   return (
//     <Seo
//       title={`#${params.hex}`}
//       description={`Tints, shades, and color info for hex code: #${params.hex}`}
//     />
//   );
// };

export default Color;
