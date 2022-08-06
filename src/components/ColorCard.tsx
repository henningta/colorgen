import { Typography } from '@mui/joy';
import Card, { CardProps } from '@mui/joy/Card';
import React from 'react';
import { getContrastColor, ntc } from '../utils';
import { passSx } from '../utils/joy';

export type ColorCardProps = CardProps & {
  colorHex: string;
  width?: number | string;
  height?: number | string;
  displayInfo?: boolean;
};

const ColorCard: React.FC<ColorCardProps> = ({
  colorHex,
  width,
  height,
  displayInfo,
  sx,
  ...props
}) => {
  const colorName = ntc.name(colorHex)[1];
  const contrastText = getContrastColor(colorHex);

  return (
    <Card
      {...props}
      sx={[
        {
          backgroundColor: colorHex,
          width: width || 80,
          height: height || 80,
          minWidth: width || 80,
          minHeight: height || 80,
        },
        ...passSx(sx),
      ]}
    >
      {displayInfo && (
        <Typography sx={{ color: contrastText }}>{colorHex}</Typography>
      )}
      {displayInfo && colorName && (
        <Typography sx={{ color: contrastText }}>{colorName}</Typography>
      )}
    </Card>
  );
};

export default ColorCard;
