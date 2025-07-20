import { useEffect, useMemo } from 'react';
import chroma from 'chroma-js';
import {
  ColorHarmonies,
  ColorInfo,
  ColorPicker,
  MobileColorMenu,
  Page,
  TintsShades,
} from '../../../components';
import {
  ColorContextProvider,
  useAppContext,
  useColorContext,
} from '../../../context';
import debounce from 'lodash.debounce';
// import config from '../../../config';
import { ClientOnly, redirect, useNavigate } from '@tanstack/react-router';
import { getColorHex, getColorName } from '../../../utils';
import { createFileRoute } from '@tanstack/react-router';
import { Box } from '@mui/joy';

const getTitle = (hex: string) => `${hex} · ${getColorName(hex)}`;

export const Route = createFileRoute('/_app/color/$hex')({
  component: ColorPageWrapper,
  beforeLoad: ({ params }) => {
    if (!chroma.valid(params.hex)) {
      redirect({ to: '/', throw: true });
    }
  },
});

function ColorPageWrapper() {
  const { hex } = Route.useParams();

  return (
    <ColorContextProvider initialColor={hex}>
      <ColorPage />
    </ColorContextProvider>
  );
}

function ColorPage() {
  const { hex } = Route.useParams();
  const navigate = useNavigate();

  const { isMobile } = useAppContext();
  const { color, colorName, colorHex, setColor } = useColorContext();

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

  // const seoHex = getColorHex(serverHex) ?? '#010';

  return (
    <Page
      title={getTitle(colorHex)}
      description={`Tints, shades, and color info for hex code: ${colorHex}`}
      image={`api/${colorHex.substring(1)}.png`}
      maxWidth={false}
      sx={{ p: '0 !important' }}
    >
      <ClientOnly>
        <Box
          sx={(theme) => ({
            width: '100%',
            maxWidth: 600,
            px: 2,
            display: isMobile ? 'none' : undefined,
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: theme.zIndex.popup,
            transition: 'all 150ms ease-in-out',
            top: 36,
          })}
        >
          <ColorPicker
            value={color}
            onChange={setColor}
            useHexPicker={!isMobile}
          />
        </Box>
      </ClientOnly>
      <ColorInfo colorHex={colorHex} colorName={colorName} />
      <TintsShades colorHex={colorHex} colorName={colorName} />
      <ColorHarmonies colorHex={colorHex} />
      <ClientOnly>{isMobile && <MobileColorMenu />}</ClientOnly>
    </Page>
  );
}
