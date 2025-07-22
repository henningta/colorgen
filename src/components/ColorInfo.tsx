import {
  Box,
  type BoxProps,
  Stack,
  Typography,
  type TypographyProps,
} from '@mui/material';
import React, { useMemo } from 'react';
import { getColorName, getContrastColor, passSx } from '../utils';
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
  <Typography {...props} sx={[{ mt: 1 }, ...passSx(sx)]} fontWeight={300}>
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
        sx={(theme) => ({
          minHeight: 'calc(100vh - 56px)',
          justifyContent: 'space-between',
          py: 4,
          px: 4,

          [theme.breakpoints.up('sm')]: {
            py: 12,
            px: 12,
          },

          [theme.breakpoints.up('lg')]: {
            py: 16,
            px: 16,
          },
        })}
      >
        <Box>
          <Typography
            // variant=""
            fontWeight={600}
            sx={{ opacity: 0.75 }}
            color={contrastText}
          >
            {colorHex}
          </Typography>
          <Typography
            variant="display1"
            color={contrastText}
            sx={{ wordWrap: 'break-word', hyphens: 'auto' }}
          >
            {colorName}
          </Typography>
        </Box>
        <Stack sx={(theme) => ({ [theme.breakpoints.down('md')]: { mb: 20 } })}>
          <ColorInfoPart label="Hex" color={contrastText}>
            {colorHex}
          </ColorInfoPart>
          <ColorInfoPart label="RGB" color={contrastText}>
            {rgb[0]}, {rgb[1]}, {rgb[2]}
          </ColorInfoPart>
          <ColorInfoPart label="HSL" color={contrastText}>
            {hsl[0].toFixed(0)}°, {(hsl[1] * 100).toFixed(1)},{' '}
            {(hsl[2] * 100).toFixed(1)}
          </ColorInfoPart>
          <ColorInfoPart label="CMYK" color={contrastText}>
            {(cmyk[0] * 100).toFixed(0)}, {(cmyk[1] * 100).toFixed(0)},{' '}
            {(cmyk[2] * 100).toFixed(0)}, {(cmyk[3] * 100).toFixed(0)}
          </ColorInfoPart>
          <ColorInfoPart label="Closest Pantone" color={contrastText}>
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
