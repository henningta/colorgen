import { useEffect, useMemo } from 'react';
import chroma from 'chroma-js';
import {
  ColorHarmonies,
  ColorInfo,
  Page,
  TintsShades,
} from '../../../components';
import { useAppContext, useColorContext } from '../../../context';
import debounce from 'lodash.debounce';
import config from '../../../config';
import { useNavigate } from '@tanstack/react-router';
import nprogress from 'nprogress';
import { getColorHex, getColorName } from '../../../utils';
import { createFileRoute } from '@tanstack/react-router';

const getTitle = (hex: string) => `${hex} · ${getColorName(hex)}`;

export const Route = createFileRoute('/_app/color/$hex')({
  component: ColorPage,
});

// type ServerDataProps = {
//   serverHex: string;
// };

function ColorPage() {
  const navigate = useNavigate();

  const { colorName, colorHex, setColor } = useColorContext();
  const { setNav } = useAppContext();

  const debounceSetUrl = useMemo(
    () =>
      debounce((hex: string) => {
        const hexStripped = hex.substring(1);

        void navigate(
          { to: '/color/$hex', params: { hex: hexStripped }, replace: true },
          // { pathname: '/color/[hex]', query: { hex: hexStripped } },
          // `/color/${hexStripped}`,
          // {
          //   shallow: true,
          // },
        );
      }, 300),
    [],
  );

  // useEffect(() => {
  //   const split = router.asPath.split('/');
  //   const hex = `#${split[split.length - 1]}`;

  //   document.title = config.titleTemplate.replace('%s', getTitle(hex));
  // }, [router]);

  // useEffect(() => {
  //   if (!serverHex || !chroma.valid(serverHex)) {
  //     void router.replace('/');
  //   } else {
  //     setColor(serverHex);
  //   }
  // }, [setColor, serverHex]);

  useEffect(() => {
    try {
      debounceSetUrl(colorHex);
    } catch (e) {
      /* ignore */
    }
  }, [debounceSetUrl, colorHex]);

  useEffect(() => {
    setNav(['color']);
    nprogress.done();
  }, [setNav]);

  // const seoHex = getColorHex(serverHex) ?? '#010';

  return (
    <Page
      // title={getTitle(seoHex)}
      // description={`Tints, shades, and color info for hex code: ${seoHex}`}
      // image={`api/${seoHex.substring(1)}.png`}
      maxWidth={false}
      sx={{ p: '0 !important' }}
    >
      <ColorInfo colorHex={colorHex} colorName={colorName} />
      <TintsShades colorHex={colorHex} colorName={colorName} />
      <ColorHarmonies colorHex={colorHex} />
    </Page>
  );
}

// https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
// export const getServerSideProps: GetServerSideProps = ({ res, params }) => {
//   // This value is considered fresh for ten seconds (s-maxage=10).
//   // If a request is repeated within the next 10 seconds, the previously
//   // cached value will still be fresh. If the request is repeated before 59 seconds,
//   // the cached value will be stale but still render (stale-while-revalidate=59).
//   //
//   // In the background, a revalidation request will be made to populate the cache
//   // with a fresh value. If you refresh the page, you will see the new value.
//   res.setHeader(
//     'Cache-Control',
//     'public, s-maxage=10, stale-while-revalidate=59',
//   );

//   const serverHex =
//     typeof params?.hex === 'string' ? `#${params?.hex}` : undefined;

//   return Promise.resolve({ props: { serverHex } });
// };
