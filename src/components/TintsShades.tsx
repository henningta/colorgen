import { Box, Stack } from '@mui/joy';
import React from 'react';
import { getShades, getTints } from '../utils';
import ColorPalette from './ColorPalette';
import PageSection from './PageSection';

export type TintsShadesProps = {
  colorHex: string;
  colorName: string;
};

const TintsShades: React.FC<TintsShadesProps> = ({ colorHex, colorName }) => {
  const tints = getTints(colorHex, undefined, 10);
  const shades = getShades(colorHex, undefined, 10);

  return (
    <PageSection
      fullPage
      title="Tints & Shades"
      subtitle={
        <Box>
          Tints & Shades for {colorName} ({colorHex})
        </Box>
      }
      sx={{ display: 'flex', flexDirection: 'column', pb: 0 }}
    >
      <Stack sx={{ flex: 1 }}>
        <ColorPalette
          title="Tints"
          subtitle={`Mixing ${colorName} with white`}
          colors={tints}
          reverse
          sx={{ pt: 6, flex: 1 }}
        />
        <ColorPalette
          title="Shades"
          subtitle={`Mixing ${colorName} with black`}
          colors={shades}
          sx={{ pt: 6, flex: 1 }}
        />
      </Stack>
    </PageSection>
  );
};

export default TintsShades;
