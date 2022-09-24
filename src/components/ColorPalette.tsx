import React from 'react';
import { Container, Stack, StackProps, Typography } from '@mui/joy';
import { Unstable_Grid2 as Grid } from '@mui/material';
import chroma from 'chroma-js';
import ColorCard from './ColorCard';

type ColorPaletteProps = StackProps & {
  title?: string;
  subtitle?: React.ReactNode;
  colors: { id: number; color: chroma.Color }[];
  reverse?: boolean;
  width?: number | string;
  height?: number | string;
  fullWidth?: boolean;
};

const ColorPalette: React.FC<ColorPaletteProps> = ({
  title,
  subtitle,
  colors,
  reverse,
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
      <Typography level="h3" fontWeight={500}>
        {title}
      </Typography>
      <Typography level="body2" sx={{ mt: 1 }}>
        {subtitle}
      </Typography>
    </Container>
    {fullWidth ? (
      <Grid container sx={{ flex: 1, mt: 2 }}>
        {(reverse ? colors.reverse() : colors).map((x) => (
          <Grid key={x.id} xs={3} sm={3} md>
            <ColorCard colorHex={x.color.hex()} width={width} height={height} />
          </Grid>
        ))}
      </Grid>
    ) : (
      <Stack direction="row" sx={{ flex: 1, mt: 2 }}>
        {(reverse ? colors.reverse() : colors).map((x) => (
          <ColorCard
            key={x.id}
            colorHex={x.color.hex()}
            width={width}
            height={height}
          />
        ))}
      </Stack>
    )}
  </Stack>
);

export default ColorPalette;
