import React from 'react';
import { Grid } from '@mui/joy';
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
      sx={{ pb: 0, display: 'flex', flexDirection: 'column' }}
    >
      <Grid
        container
        spacing={4}
        sx={{ mt: 2, flex: 1, justifyContent: 'center' }}
      >
        <Grid xs={12} sm={6}>
          <ColorPalette
            title="Analogous"
            colors={[
              { id: 1, color: chromaColor.set('hsl.h', '-30') },
              { id: 2, color: chromaColor },
              { id: 3, color: chromaColor.set('hsl.h', '+30') },
            ]}
            sx={{ height: '100%', minHeight: 200 }}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <ColorPalette
            title="Complementary"
            colors={[
              { id: 1, color: chromaColor },
              { id: 2, color: chromaColor.set('hsl.h', '+180') },
            ]}
            sx={{ height: '100%', minHeight: 200 }}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <ColorPalette
            title="Split Complementary"
            colors={[
              { id: 1, color: chromaColor },
              { id: 2, color: chromaColor.set('hsl.h', '+150') },
              { id: 3, color: chromaColor.set('hsl.h', '+210') },
            ]}
            sx={{ height: '100%', minHeight: 200 }}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <ColorPalette
            title="Triadic"
            colors={[
              { id: 1, color: chromaColor },
              { id: 2, color: chromaColor.set('hsl.h', '+120') },
              { id: 3, color: chromaColor.set('hsl.h', '-120') },
            ]}
            sx={{ height: '100%', minHeight: 200 }}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <ColorPalette
            title="Tetradic Rectangular"
            colors={[
              { id: 1, color: chromaColor },
              { id: 2, color: chromaColor.set('hsl.h', '+60') },
              { id: 3, color: chromaColor.set('hsl.h', '+180') },
              { id: 4, color: chromaColor.set('hsl.h', '-120') },
            ]}
            sx={{ height: '100%', minHeight: 200 }}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <ColorPalette
            title="Tetradic Square"
            colors={[
              { id: 1, color: chromaColor },
              { id: 2, color: chromaColor.set('hsl.h', '+90') },
              { id: 3, color: chromaColor.set('hsl.h', '+180') },
              { id: 4, color: chromaColor.set('hsl.h', '-90') },
            ]}
            sx={{ height: '100%', minHeight: 200 }}
          />
        </Grid>
      </Grid>
    </PageSection>
  );
};

export default ColorHarmonies;
