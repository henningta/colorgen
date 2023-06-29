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
import nprogress from 'nprogress';
import { getColorHex, getColorName } from '../../utils';
import { createCanvas } from 'canvas';
import fs from 'fs/promises';

const fileExists = async (path: string) => {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};

const SEO_IMG_SIZE = 80;

const getTitle = (hex: string) => `${hex} · ${getColorName(hex)}`;

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
    const hex = `#${split[split.length - 1]}`;

    document.title = config.titleTemplate.replace('%s', getTitle(hex));
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
    nprogress.done();
  }, [setNav]);

  return (
    <Page
      {...props}
      title={getTitle(colorHex)}
      description={`Tints, shades, and color info for hex code: ${colorHex}`}
      image={`/${colorHex.substring(1)}.png`}
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
export const getServerSideProps: GetServerSideProps = async ({
  res,
  params,
}) => {
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

  if (serverHex && chroma.valid(serverHex)) {
    const canvas = createCanvas(SEO_IMG_SIZE, SEO_IMG_SIZE);
    const canvasContext = canvas.getContext('2d');
    canvasContext.fillStyle = serverHex;
    canvasContext.fillRect(0, 0, SEO_IMG_SIZE, SEO_IMG_SIZE);

    const buffer = canvas.toBuffer('image/png');
    const cleanHex = getColorHex(serverHex);

    if (cleanHex) {
      const filename = `./${cleanHex.substring(1)}.png`;
      const exists = await fileExists(filename);

      if (!exists) {
        // console.log('not exists');
        await fs.writeFile(filename, buffer);
      } else {
        // console.log('exists');
      }
    }
  }

  return Promise.resolve({ props: { serverHex } });
};

export default Color;
