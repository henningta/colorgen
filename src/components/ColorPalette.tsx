import React from 'react';
import { Container, Stack, type StackProps, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import chroma from 'chroma-js';
import ColorCard from './ColorCard';

type ColorPaletteProps = StackProps & {
  colors: { id: number; color: chroma.Color }[];
  onColorSelected: (color: string) => void;
  title?: string;
  subtitle?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  fullWidth?: boolean;
};

const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  onColorSelected,
  title,
  subtitle,
  width,
  height,
  fullWidth,
  ...props
}) => (
  <Stack {...props}>
    <Container
      maxWidth={false}
      sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
    >
      <Typography variant="h4" fontWeight={500}>
        {title}
      </Typography>
      <Typography sx={{ mt: 1 }}>{subtitle}</Typography>
    </Container>
    {fullWidth ? (
      <Grid container sx={{ flex: 1, mt: 2 }}>
        {colors.map((x) => (
          <Grid key={x.id} size={{ xs: 3, sm: 3, md: 'grow' }}>
            <ColorCard
              colorHex={x.color.hex()}
              onSetAsSelected={onColorSelected}
              width={width}
              height={height}
            />
          </Grid>
        ))}
      </Grid>
    ) : (
      <Stack direction="row" sx={{ flex: 1, mt: 2 }}>
        {colors.map((x) => (
          <ColorCard
            key={x.id}
            colorHex={x.color.hex()}
            onSetAsSelected={onColorSelected}
            width={width}
            height={height}
          />
        ))}
      </Stack>
    )}
  </Stack>
);

export default ColorPalette;
