import React from 'react';
import { Container, Stack, StackProps, Typography } from '@mui/joy';
import chroma from 'chroma-js';
import ColorCard from './ColorCard';

type ColorPaletteProps = StackProps & {
  title?: string;
  subtitle?: React.ReactNode;
  colors: { id: number; color: chroma.Color }[];
  reverse?: boolean;
  width?: number | string;
  height?: number | string;
};

const ColorPalette: React.FC<ColorPaletteProps> = ({
  title,
  subtitle,
  colors,
  reverse,
  width,
  height,
  ...props
}) => (
  <Stack {...props}>
    <Container maxWidth={false}>
      <Typography level="h3" fontWeight={500}>
        {title}
      </Typography>
      <Typography level="body2" sx={{ mt: 1 }}>
        {subtitle}
      </Typography>
    </Container>
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
  </Stack>
);

export default ColorPalette;
