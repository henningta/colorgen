import { Box, Container, Slider, TextField, Typography } from '@mui/joy';
import Card from '@mui/joy/Card';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { contrast, hexToRgb, ntc } from '../utils';

type ColorCardProps = {
  color: string;
  alpha: number;
};

const ColorCard: React.FC<ColorCardProps> = ({ color, alpha }) => {
  const rgb = hexToRgb(color);
  if (!rgb) {
    return <></>;
  }

  const contrastWhite = contrast(rgb, [255, 255, 255]);
  const contrastBlack = contrast(rgb, [0, 0, 0]);

  const textColor =
    contrastWhite >= 3 || contrastWhite >= contrastBlack
      ? 'common.white'
      : 'common.black';

  const rgba = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;

  const colorName = ntc.name(color)[1] as string;

  return (
    <Card
      sx={{
        backgroundColor: rgba,
        height: 200,
      }}
    >
      <Typography sx={{ color: textColor }} level="h4">
        {color} &mdash; {colorName}
      </Typography>
    </Card>
  );
};

const Overview: React.FC = () => {
  const [color, setColor] = useState('#c41e3a');
  const [alpha, setAlpha] = useState(1);

  return (
    <Box>
      <TextField
        label="Select a color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <Container maxWidth="sm" sx={{ display: 'flex', mt: 4 }}>
        <HexColorPicker
          style={{ width: 200 }}
          color={color}
          onChange={setColor}
        />
        <Box sx={{ flex: 1, ml: 4 }}>
          <Typography>Alpha</Typography>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={alpha}
            onChange={(_, value) => setAlpha(value as number)}
            valueLabelDisplay="on"
          />
        </Box>
      </Container>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <ColorCard color={color} alpha={alpha} />
      </Container>
    </Box>
  );
};

export default Overview;
