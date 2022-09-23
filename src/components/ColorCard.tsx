import { Typography } from '@mui/joy';
import Card, { CardProps } from '@mui/joy/Card';
import React from 'react';
import { getContrastColor } from '../utils';

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
  ...props
}) => {
  const contrastText = getContrastColor(colorHex);

  return (
    <Card
      {...props}
      style={{
        backgroundColor: colorHex,
        width,
        height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        boxShadow: 'none',
      }}
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
