import { Box, Stack, Typography } from '@mui/joy';
import React from 'react';
import { getContrastColor } from '../utils';
import pant from 'nearest-pantone';
import chroma from 'chroma-js';

type ColorInfoPartProps = {
  children: React.ReactNode;
  label: string;
  color: string;
};

const ColorInfoPart: React.FC<ColorInfoPartProps> = ({
  children,
  label,
  color,
}) => (
  <Typography sx={{ mt: 1, color }} fontWeight={300}>
    {label}: {children}
  </Typography>
);

export type ColorInfoProps = {
  colorHex: string;
  colorName: string;
};

const ColorInfo: React.FC<ColorInfoProps> = ({ colorHex, colorName }) => {
  const contrastText = getContrastColor(colorHex);
  const nearestPantone = pant.getClosestColor(colorHex);
  // const nearestPantone = { name: '', pantone: '', hex: '' };

  const chromaColor = chroma(colorHex);
  const rgb = chromaColor.rgb();
  const hsl = chromaColor.hsl();
  const cmyk = chromaColor.cmyk();

  return (
    <Box sx={{ height: '100%', backgroundColor: colorHex }}>
      <Stack
        sx={{
          minHeight: 'calc(100vh - 64px)',
          justifyContent: 'space-between',
          py: 16,
          px: 16,
        }}
      >
        <Box>
          <Typography
            fontWeight={600}
            sx={{ color: contrastText, opacity: 0.75 }}
          >
            {colorHex}
          </Typography>
          <Typography level="display1" sx={{ color: contrastText }}>
            {colorName}
          </Typography>
        </Box>
        <Stack>
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
                <Typography>{nearestPantone.pantone}</Typography>,{' '}
                <Typography sx={{ textTransform: 'capitalize' }}>
                  {nearestPantone.name.split('-').join(' ')}
                </Typography>
                , <Typography>{nearestPantone.hex}</Typography>
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
