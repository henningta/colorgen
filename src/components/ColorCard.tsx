import { Typography } from '@mui/joy';
import Card, { CardProps } from '@mui/joy/Card';
import React from 'react';
import { getContrastColor, ntc } from '../utils';

export type ColorCardProps = CardProps & {
  colorHex: string;
};

const ColorCard: React.FC<ColorCardProps> = ({ colorHex, ...props }) => {
  const colorName = ntc.name(colorHex)[1];
  const contrastText = getContrastColor(colorHex);

  return (
    <Card
      {...props}
      sx={{
        backgroundColor: colorHex,
        width: 160,
        height: 160,
        boxShadow: 'none',
      }}
    >
      <Typography sx={{ color: contrastText }}>{colorHex}</Typography>
      {colorName && (
        <Typography sx={{ color: contrastText }}>{colorName}</Typography>
      )}
    </Card>
  );
};

export default ColorCard;
