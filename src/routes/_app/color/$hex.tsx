import { useEffect, useState } from 'react';
import chroma from 'chroma-js';
import {
  ColorHarmonies,
  ColorInfo,
  ColorPicker,
  MobileColorMenu,
  Page,
  TintsShades,
} from '~/components';
import { ColorStoreProvider } from '~/context';
import { ClientOnly, redirect, useNavigate } from '@tanstack/react-router';
import { getColorHex, getColorName } from '~/utils';
import { createFileRoute } from '@tanstack/react-router';
import { Box, useMediaQuery } from '@mui/material';
import { useSelectedColor } from '~/hooks';

const url = 'https://www.colorgen.io';

const getTitle = (hex: string) => `${hex} · ${getColorName(hex)} · colorgen.io`;

export const Route = createFileRoute('/_app/color/$hex')({
  component: ColorPageWrapper,
  beforeLoad: ({ params }) => {
    if (!chroma.valid(params.hex)) {
      redirect({ to: '/', throw: true });
    }
  },
  head: ({ match, params }) => {
    const hex = getColorHex(params.hex) ?? params.hex;
    const title = getTitle(hex);
    const description = `Tints, shades, and color info for hex code: ${hex}`;
    const imgUrl = `${url}/api/${hex.substring(1)}.png`;

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: `${url}${match.pathname}` },

        // seo color image
        { property: 'og:image', content: imgUrl },
        { property: 'og:image:secure_url', content: imgUrl },
        { property: 'og:image:width', content: '80' },
        { property: 'og:image:height', content: '80' },
        { property: 'og:image:alt', content: hex },
      ],
      links: [{ rel: 'canonical', href: `${url}${match.pathname}` }],
    };
  },
});

function ColorPageWrapper() {
  const { hex } = Route.useParams();

  return (
    <ColorStoreProvider initialColor={hex}>
      <ColorPage />
    </ColorStoreProvider>
  );
}

function ColorPage() {
  const navigate = useNavigate();

  const { colorHex, selectedColor, setSelectedColor } = useSelectedColor();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [selectedColorHex, setSelectedColorHex] = useState(colorHex);

  useEffect(() => {
    const hex = getColorHex(selectedColor);
    if (hex) {
      setSelectedColorHex(hex);
    }
  }, [selectedColor]);

  useEffect(() => {
    void navigate({
      to: '/color/$hex',
      params: { hex: colorHex.substring(1) },
      replace: true,
      resetScroll: false,
    });
  }, [colorHex, navigate]);

  return (
    <Page maxWidth={false} sx={{ p: '0 !important' }}>
      <ClientOnly>
        <Box
          sx={(theme) => ({
            width: '100%',
            maxWidth: 600,
            px: 2,
            display: { xs: 'none', md: 'block' },
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: theme.zIndex.modal,
            transition: 'all 150ms ease-in-out',
            top: 36,
          })}
        >
          <ColorPicker
            value={selectedColor}
            onChange={setSelectedColor}
            useHexPicker
          />
        </Box>
      </ClientOnly>
      <ColorInfo colorHex={selectedColorHex} />
      <TintsShades colorHex={colorHex} onColorSelected={setSelectedColor} />
      <ColorHarmonies colorHex={colorHex} onColorSelected={setSelectedColor} />
      <ClientOnly>
        {isMobile && (
          <MobileColorMenu value={selectedColor} onChange={setSelectedColor} />
        )}
      </ClientOnly>
    </Page>
  );
}
