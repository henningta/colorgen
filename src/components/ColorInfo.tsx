import { Box, Stack, Typography, TypographyProps } from '@mui/joy';
import React from 'react';
import { getContrastColor, passSx } from '../utils';
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

export type ColorInfoProps = {
  colorHex: string;
  colorName: string;
};

const ColorInfo: React.FC<ColorInfoProps> = ({ colorHex, colorName }) => {
  const contrastText = getContrastColor(colorHex);
  const nearestPantone = pant.getClosestColor(colorHex);

  const chromaColor = chroma(colorHex);
  const rgb = chromaColor.rgb();
  const hsl = chromaColor.hsl();
  const cmyk = chromaColor.cmyk();

  return (
    <Box style={{ height: '100%', backgroundColor: colorHex }}>
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
            sx={{ opacity: 0.75 }}
            textColor={contrastText}
          >
            {colorHex}
          </Typography>
          <Typography level="display1" textColor={contrastText}>
            {colorName}
          </Typography>
        </Box>
        <Stack>
          <ColorInfoPart label="Hex" textColor={contrastText}>
            {colorHex}
          </ColorInfoPart>
          <ColorInfoPart label="RGB" textColor={contrastText}>
            {rgb[0]}, {rgb[1]}, {rgb[2]}
          </ColorInfoPart>
          <ColorInfoPart label="HSL" textColor={contrastText}>
            {hsl[0].toFixed(0)}°, {(hsl[1] * 100).toFixed(1)},{' '}
            {(hsl[2] * 100).toFixed(1)}
          </ColorInfoPart>
          <ColorInfoPart label="CMYK" textColor={contrastText}>
            {(cmyk[0] * 100).toFixed(0)}, {(cmyk[1] * 100).toFixed(0)},{' '}
            {(cmyk[2] * 100).toFixed(0)}, {(cmyk[3] * 100).toFixed(0)}
          </ColorInfoPart>
          <ColorInfoPart label="Closest Pantone" textColor={contrastText}>
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
