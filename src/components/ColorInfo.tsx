import {
  Box,
  type BoxProps,
  Stack,
  Typography,
  type TypographyProps,
} from '@mui/material';
import { useMemo } from 'react';
import { getColorName, getContrastColor, passSx } from '~/utils';
import pant from 'nearest-pantone';
import chroma from 'chroma-js';

type ColorInfoPartProps = TypographyProps & {
  children: React.ReactNode;
  label: string;
};

const ColorInfoPart: React.FC<ColorInfoPartProps> = ({
  children,
  label,
  sx,
  ...props
}) => (
  <Typography sx={[{ fontWeight: 300, mt: 1 }, ...passSx(sx)]} {...props}>
    {label}: {children}
  </Typography>
);

export type ColorInfoProps = BoxProps & {
  colorHex: string;
};

const ColorInfo: React.FC<ColorInfoProps> = ({ colorHex, style, ...props }) => {
  const colorName = useMemo(() => getColorName(colorHex), [colorHex]);
  const contrastText = useMemo(() => getContrastColor(colorHex), [colorHex]);
  const nearestPantone = useMemo(
    () => pant.getClosestColor(colorHex),
    [colorHex],
  );

  const chromaColor = chroma(colorHex);
  const rgb = chromaColor.rgb();
  const hsl = chromaColor.hsl();
  const cmyk = chromaColor.cmyk();

  return (
    <Box
      style={{ height: '100%', backgroundColor: colorHex, ...style }}
      {...props}
    >
      <Stack
        sx={{
          minHeight: 'calc(100vh - 56px)',
          justifyContent: 'space-between',
          py: { xs: 4, sm: 12, lg: 16 },
          px: { xs: 4, sm: 12, lg: 16 },
        }}
      >
        <Box>
          <Typography
            sx={{
              color: contrastText,
              fontWeight: 600,
              opacity: 0.75,
            }}
          >
            {colorHex}
          </Typography>
          <Typography
            component="h1"
            variant="display1"
            sx={{
              color: contrastText,
              wordWrap: 'break-word',
              hyphens: 'auto',
            }}
          >
            {colorName}
          </Typography>
        </Box>
        <Stack sx={{ mb: { xs: 20, md: 0 } }}>
          <ColorInfoPart label="Hex" sx={{ color: contrastText }}>
            {colorHex}
          </ColorInfoPart>
          <ColorInfoPart label="RGB" sx={{ color: contrastText }}>
            {rgb[0]}, {rgb[1]}, {rgb[2]}
          </ColorInfoPart>
          <ColorInfoPart label="HSL" sx={{ color: contrastText }}>
            {hsl[0].toFixed(0)}°, {(hsl[1] * 100).toFixed(1)},{' '}
            {(hsl[2] * 100).toFixed(1)}
          </ColorInfoPart>
          <ColorInfoPart label="CMYK" sx={{ color: contrastText }}>
            {(cmyk[0] * 100).toFixed(0)}, {(cmyk[1] * 100).toFixed(0)},{' '}
            {(cmyk[2] * 100).toFixed(0)}, {(cmyk[3] * 100).toFixed(0)}
          </ColorInfoPart>
          <ColorInfoPart label="Closest Pantone" sx={{ color: contrastText }}>
            {nearestPantone ? (
              <>
                {nearestPantone.pantone},{' '}
                {nearestPantone.name.split('-').join(' ')}, {nearestPantone.hex}
              </>
            ) : (
              'unknown'
            )}
          </ColorInfoPart>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ColorInfo;
