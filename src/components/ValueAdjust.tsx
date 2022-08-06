import React from 'react';
import { Box, BoxProps, Slider, TextField, Typography } from '@mui/joy';
import { passSx } from '../utils';

export type ValueAdjustProps = Omit<BoxProps, 'onChange'> & {
  title: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean;
  valueDisplay?: string | number;
};

const ValueAdjust: React.FC<ValueAdjustProps> = ({
  title,
  value,
  onChange,
  disabled,
  min,
  max,
  step,
  marks,
  valueDisplay,
  sx,
  ...props
}) => {
  const handleChange = (value: string) => {
    if (value?.length === 0) {
      return onChange(0);
    }

    const parsed = parseInt(value);
    !isNaN(parsed) && onChange(parsed);
  };

  return (
    <Box {...props} sx={[{ minWidth: 160 }, ...passSx(sx)]}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>{title}</Typography>
        <TextField
          variant="soft"
          sx={{ width: 0, minWidth: 56, ml: 'auto', direction: 'rtl' }}
          value={valueDisplay || value}
          onChange={(e) => handleChange(e.currentTarget.value)}
          disabled={disabled}
        />
      </Box>
      <Slider
        value={value}
        onChange={(_, value) => onChange(value as number)}
        min={min}
        max={max}
        step={step}
        marks={marks}
        disabled={disabled}
      />
    </Box>
  );
};

export default ValueAdjust;
