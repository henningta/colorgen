import { Stack } from '@mui/joy';
import React, { memo, useMemo } from 'react';
import { getColorName, getShades, getTints } from '../utils';
import ColorPalette from './ColorPalette';
import PageSection from './PageSection';

export type TintsShadesProps = {
  colorHex: string;
};

const TintsShades: React.FC<TintsShadesProps> = ({ colorHex }) => {
  const colorName = useMemo(() => getColorName(colorHex), [colorHex]);
  const tints = useMemo(
    () => getTints(colorHex, undefined, 10).reverse(),
    [colorHex],
  );
  const shades = useMemo(() => getShades(colorHex, undefined, 10), [colorHex]);

  return (
    <PageSection
      fullPage
      title="Tints & Shades"
      subtitle={`Tints & Shades for ${colorName} (${colorHex})`}
      sx={{ display: 'flex', flexDirection: 'column', pb: 0 }}
    >
      <Stack sx={{ flex: 1 }}>
        <ColorPalette
          title="Tints"
          subtitle={`Mixing ${colorName} with white`}
          colors={tints}
          fullWidth
          sx={{ pt: 6, flex: 1 }}
        />
        <ColorPalette
          title="Shades"
          subtitle={`Mixing ${colorName} with black`}
          colors={shades}
          fullWidth
          sx={{ pt: 6, flex: 1 }}
        />
      </Stack>
    </PageSection>
  );
};

export default memo(TintsShades);
