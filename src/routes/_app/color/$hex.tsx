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
import { redirect, useNavigate } from '@tanstack/react-router';
import nprogress from 'nprogress';
import { getColorHex, getColorName } from '../../../utils';
import { createFileRoute } from '@tanstack/react-router';

const getTitle = (hex: string) => `${hex} · ${getColorName(hex)}`;

export const Route = createFileRoute('/_app/color/$hex')({
  component: ColorPage,
  beforeLoad: ({ params }) => {
    if (!chroma.valid(params.hex)) {
      redirect({ to: '/', throw: true });
    }
  },
});

function ColorPage() {
  const { hex } = Route.useParams();
  const navigate = useNavigate();

  const { colorName, colorHex, setColor } = useColorContext();

  const debounceSetUrl = useMemo(
    () =>
      debounce(async (hex: string) => {
        const hexStripped = hex.substring(1);

        await navigate({
          to: '/color/$hex',
          params: { hex: hexStripped },
          replace: true,
        });
      }, 300),
    [],
  );

  // useEffect(() => {
  //   const split = router.asPath.split('/');
  //   const hex = `#${split[split.length - 1]}`;

  //   document.title = config.titleTemplate.replace('%s', getTitle(hex));
  // }, [router]);

  useEffect(() => {
    setColor(hex);
  }, [hex, setColor]);

  useEffect(() => {
    try {
      void debounceSetUrl(colorHex);
    } catch {
      /* ignore */
    }
  }, [debounceSetUrl, colorHex]);

  useEffect(() => {
    nprogress.done();
  }, []);

  // const seoHex = getColorHex(serverHex) ?? '#010';

  return (
    <Page
      title={getTitle(colorHex)}
      description={`Tints, shades, and color info for hex code: ${colorHex}`}
      image={`api/${colorHex.substring(1)}.png`}
      maxWidth={false}
      sx={{ p: '0 !important' }}
    >
      <ColorInfo colorHex={colorHex} colorName={colorName} />
      <TintsShades colorHex={colorHex} colorName={colorName} />
      <ColorHarmonies colorHex={colorHex} />
    </Page>
  );
}
