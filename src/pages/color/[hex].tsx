import React, { useEffect, useMemo } from 'react';
import chroma from 'chroma-js';
import {
  ColorHarmonies,
  ColorInfo,
  Page,
  PageProps,
  TintsShades,
} from '../../components';
import { useAppContext, useColorContext } from '../../context';
import debounce from 'lodash.debounce';
import config from '../../config';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

type ServerDataProps = {
  serverHex: string;
};

const Color: React.FC<PageProps & ServerDataProps> = ({
  serverHex,
  ...props
}) => {
  const router = useRouter();

  const { colorName, colorHex, setColor } = useColorContext();
  const { setNav } = useAppContext();

  const debounceSetUrl = useMemo(
    () =>
      debounce((hex: string) => {
        const hexStripped = hex.substring(1);

        void router.replace(
          { pathname: '/color/[hex]', query: { hex: hexStripped } },
          `/color/${hexStripped}`,
          {
            shallow: true,
          }
        );
      }, 300),
    []
  );

  useEffect(() => {
    const split = router.asPath.split('/');
    document.title = config.titleTemplate.replace(
      '%s',
      `#${split[split.length - 1]}`
    );
  }, [router]);

  useEffect(() => {
    if (!serverHex || !chroma.valid(serverHex)) {
      void router.replace('/');
    } else {
      setColor(serverHex);
    }
  }, [setColor, serverHex]);

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
      title={serverHex}
      description={`Tints, shades, and color info for hex code: ${serverHex}`}
      maxWidth={false}
      sx={{ p: '0 !important' }}
    >
      <ColorInfo colorHex={colorHex} colorName={colorName} />
      <TintsShades colorHex={colorHex} colorName={colorName} />
      <ColorHarmonies colorHex={colorHex} />
    </Page>
  );
};

// https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
export const getServerSideProps: GetServerSideProps = ({ res, params }) => {
  // This value is considered fresh for ten seconds (s-maxage=10).
  // If a request is repeated within the next 10 seconds, the previously
  // cached value will still be fresh. If the request is repeated before 59 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=59).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const serverHex =
    typeof params?.hex === 'string' ? `#${params?.hex}` : undefined;

  return Promise.resolve({ props: { serverHex } });
};

export default Color;
