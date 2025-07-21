import { useEffect, useMemo, useState } from 'react';
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
  ColorStoreProvider,
  useAppContext,
  useColorStore,
} from '../../../context';
import debounce from 'lodash.debounce';
// import config from '../../../config';
import { ClientOnly, redirect, useNavigate } from '@tanstack/react-router';
import { getColorHex, getColorName } from '../../../utils';
import { createFileRoute } from '@tanstack/react-router';
import { Box } from '@mui/joy';
import { useShallow } from 'zustand/shallow';

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
    <ColorStoreProvider initialColor={hex}>
      <ColorPage />
    </ColorStoreProvider>
  );
}

function ColorPage() {
  const navigate = useNavigate();

  const { isMobile } = useAppContext();
  const { colorHex, setColor } = useColorStore(
    useShallow((state) => ({
      colorHex: state.colorHex,
      setColor: state.setColor,
    })),
  );

  const [selectedColor, setSelectedColor] = useState(colorHex);
  const [selectedColorHex, setSelectedColorHex] = useState(colorHex);

  useEffect(() => {
    const hex = getColorHex(selectedColor);
    if (hex) {
      setSelectedColorHex(hex);
    }
  }, [selectedColor]);

  // useEffect(() => {
  //   const split = router.asPath.split('/');
  //   const hex = `#${split[split.length - 1]}`;

  //   document.title = config.titleTemplate.replace('%s', getTitle(hex));
  // }, [router]);

  const debouncedSetColor = useMemo(
    () => debounce((color: string) => setColor(color), 200),
    [setColor],
  );

  useEffect(() => {
    debouncedSetColor(selectedColor);
  }, [selectedColor, debouncedSetColor]);

  useEffect(() => {
    // already debounced from color set
    void navigate({
      to: '/color/$hex',
      params: { hex: colorHex.substring(1) },
      replace: true,
      resetScroll: false,
    });
  }, [colorHex, navigate]);

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
            value={selectedColor}
            onChange={setSelectedColor}
            useHexPicker={!isMobile}
          />
        </Box>
      </ClientOnly>
      <ColorInfo colorHex={selectedColorHex} />
      <TintsShades colorHex={colorHex} />
      <ColorHarmonies colorHex={colorHex} />
      <ClientOnly>
        {isMobile && (
          <MobileColorMenu value={selectedColor} onChange={setSelectedColor} />
        )}
      </ClientOnly>
    </Page>
  );
}
