import React from 'react';
import { Stack } from '@mui/joy';
import PageSection from './PageSection';
import ColorPalette from './ColorPalette';
import chroma from 'chroma-js';

export type ColorHarmoniesProps = {
  colorHex: string;
};

const ColorHarmonies: React.FC<ColorHarmoniesProps> = ({ colorHex }) => {
  const chromaColor = chroma(colorHex);

  return (
    <PageSection
      title="Color Harmonies"
      subtitle='Color harmonies consist of a variety of combinations of colors on the "color wheel"'
      sx={{ pb: 0 }}
    >
      <Stack direction="row" sx={{ mt: 6 }}>
        <ColorPalette
          title="Analogous"
          colors={[
            { id: 1, color: chromaColor.set('hsl.h', '-30') },
            { id: 2, color: chromaColor },
            { id: 3, color: chromaColor.set('hsl.h', '+30') },
          ]}
          sx={{ flex: 1, height: 400, mr: 2 }}
        />
        <ColorPalette
          title="Complementary"
          colors={[
            { id: 1, color: chromaColor },
            { id: 2, color: chromaColor.set('hsl.h', '+180') },
          ]}
          sx={{ flex: 1, height: 400, mx: 2 }}
        />
        <ColorPalette
          title="Split Complementary"
          colors={[
            { id: 1, color: chromaColor },
            { id: 2, color: chromaColor.set('hsl.h', '+150') },
            { id: 3, color: chromaColor.set('hsl.h', '+210') },
          ]}
          sx={{ flex: 1, height: 400, ml: 2 }}
        />
      </Stack>
      <Stack direction="row" sx={{ mt: 6 }}>
        <ColorPalette
          title="Triadic"
          colors={[
            { id: 1, color: chromaColor },
            { id: 2, color: chromaColor.set('hsl.h', '+120') },
            { id: 3, color: chromaColor.set('hsl.h', '-120') },
          ]}
          sx={{ flex: 1, height: 400, mr: 2 }}
        />
        <ColorPalette
          title="Tetradic Rectangular"
          colors={[
            { id: 1, color: chromaColor },
            { id: 2, color: chromaColor.set('hsl.h', '+60') },
            { id: 3, color: chromaColor.set('hsl.h', '+180') },
            { id: 4, color: chromaColor.set('hsl.h', '-120') },
          ]}
          sx={{ flex: 1, height: 400, mx: 2 }}
        />
        <ColorPalette
          title="Tetradic Square"
          colors={[
            { id: 1, color: chromaColor },
            { id: 2, color: chromaColor.set('hsl.h', '+90') },
            { id: 3, color: chromaColor.set('hsl.h', '+180') },
            { id: 4, color: chromaColor.set('hsl.h', '-90') },
          ]}
          sx={{ flex: 1, height: 400, ml: 2 }}
        />
      </Stack>
    </PageSection>
  );
};

export default ColorHarmonies;
