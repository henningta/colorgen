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
          width: width || 160,
          height: height || 160,
          minWidth: width || 160,
          minHeight: height || 160,
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
