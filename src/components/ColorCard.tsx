import { Typography } from '@mui/joy';
import Card, { CardProps } from '@mui/joy/Card';
import React from 'react';
import { getContrastColor } from '../utils';
import { passSx } from '../utils/joy';

export type ColorCardProps = CardProps & {
  colorHex: string;
  width?: number | string;
  height?: number | string;
  displayHex?: boolean;
};

const ColorCard: React.FC<ColorCardProps> = ({
  colorHex,
  width,
  height,
  displayHex,
  sx,
  ...props
}) => {
  const contrastText = getContrastColor(colorHex);

  return (
    <Card
      {...props}
      sx={[
        {
          backgroundColor: colorHex,
          width,
          height,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 0,
          boxShadow: 'none',
        },
        ...passSx(sx),
      ]}
    >
      {displayHex && (
        <Typography level="body2" sx={{ color: contrastText }}>
          {colorHex}
        </Typography>
      )}
    </Card>
  );
};

ColorCard.defaultProps = {
  width: '100%',
  height: '100%',
  displayHex: true,
};

export default ColorCard;
