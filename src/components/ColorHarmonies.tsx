import React, { memo, useMemo } from 'react';
import { Grid } from '@mui/material';
import PageSection from './PageSection';
import ColorPalette from './ColorPalette';
import chroma from 'chroma-js';

export type ColorHarmoniesProps = {
  colorHex: string;
  onColorSelected: (color: string) => void;
};

const ColorHarmonies: React.FC<ColorHarmoniesProps> = ({
  colorHex,
  onColorSelected,
}) => {
  const chromaColor = useMemo(() => chroma(colorHex), [colorHex]);

  return (
    <PageSection
      title="Color Harmonies"
      subtitle='Color harmonies consist of a variety of combinations of colors on the "color wheel"'
      sx={{ pb: 0, display: 'flex', flexDirection: 'column' }}
    >
      <Grid
        container
        rowSpacing={4}
        columnSpacing={{ xs: 0, sm: 4 }}
        sx={{ mt: 2, flex: 1, justifyContent: 'center' }}
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <ColorPalette
            title="Analogous"
            colors={[
              { id: 1, color: chromaColor.set('hsl.h', '-30') },
              { id: 2, color: chromaColor },
              { id: 3, color: chromaColor.set('hsl.h', '+30') },
            ]}
            onColorSelected={onColorSelected}
            sx={{ height: '100%', minHeight: 200 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ColorPalette
            title="Complementary"
            colors={[
              { id: 1, color: chromaColor },
              { id: 2, color: chromaColor.set('hsl.h', '+180') },
            ]}
            onColorSelected={onColorSelected}
            sx={{ height: '100%', minHeight: 200 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ColorPalette
            title="Split Complementary"
            colors={[
              { id: 1, color: chromaColor },
              { id: 2, color: chromaColor.set('hsl.h', '+150') },
              { id: 3, color: chromaColor.set('hsl.h', '+210') },
            ]}
            onColorSelected={onColorSelected}
            sx={{ height: '100%', minHeight: 200 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ColorPalette
            title="Triadic"
            colors={[
              { id: 1, color: chromaColor },
              { id: 2, color: chromaColor.set('hsl.h', '+120') },
              { id: 3, color: chromaColor.set('hsl.h', '-120') },
            ]}
            onColorSelected={onColorSelected}
            sx={{ height: '100%', minHeight: 200 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ColorPalette
            title="Tetradic Rectangular"
            colors={[
              { id: 1, color: chromaColor },
              { id: 2, color: chromaColor.set('hsl.h', '+60') },
              { id: 3, color: chromaColor.set('hsl.h', '+180') },
              { id: 4, color: chromaColor.set('hsl.h', '-120') },
            ]}
            onColorSelected={onColorSelected}
            sx={{ height: '100%', minHeight: 200 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ColorPalette
            title="Tetradic Square"
            colors={[
              { id: 1, color: chromaColor },
              { id: 2, color: chromaColor.set('hsl.h', '+90') },
              { id: 3, color: chromaColor.set('hsl.h', '+180') },
              { id: 4, color: chromaColor.set('hsl.h', '-90') },
            ]}
            onColorSelected={onColorSelected}
            sx={{ height: '100%', minHeight: 200 }}
          />
        </Grid>
      </Grid>
    </PageSection>
  );
};

export default memo(ColorHarmonies);
