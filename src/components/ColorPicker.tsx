import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Sheet,
  TextField,
  useColorScheme,
} from '@mui/joy';
import Card, { CardProps } from '@mui/joy/Card';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { getColorHex, passSx } from '../utils';
import Icon from './Icon';
import { Tooltip } from '@mui/material';
import chroma from 'chroma-js';

export type ColorPickerProps = Omit<CardProps, 'onChange'> & {
  value: string;
  onChange: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  sx,
  ...props
}) => {
  const { mode } = useColorScheme();

  const [anchorEl, setAnchorEl] = useState<HTMLElement>();

  const colorHex = getColorHex(value);

  const toggleMenu: React.MouseEventHandler<HTMLAnchorElement> = (e) =>
    setAnchorEl((prev) => (prev ? undefined : e.currentTarget));

  return (
    <>
      <Card
        variant="plain"
        sx={[
          {
            p: 0,
            pr: 1,
            height: 56,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            boxShadow: 'md',
            border: `1px solid ${mode === 'dark' ? '#333' : '#ccc'}`,
          },
          ...passSx(sx),
        ]}
        {...props}
      >
        <Button
          id="color-picker-button"
          variant="plain"
          color="neutral"
          sx={{
            height: '100%',
            minWidth: 80,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            pl: 3,
          }}
          onClick={toggleMenu}
          endDecorator={
            <Icon style={{ fontSize: 18 }}>keyboard_arrow_down</Icon>
          }
        >
          Hex
        </Button>
        <Box
          sx={{
            width: '2px',
            height: '100%',
            backgroundColor: mode === 'dark' ? '#333' : '#ccc',
          }}
        />
        <Box
          sx={{ pl: 2, display: 'flex', alignItems: 'center', width: '100%' }}
        >
          <Sheet
            variant="outlined"
            style={{
              width: 28,
              height: 28,
              backgroundColor: colorHex,
              borderRadius: '50%',
            }}
          />
          <TextField
            variant="soft"
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            sx={{ ml: 2, width: 0, flex: 1 }}
          />
          <Tooltip title="Random Hex">
            <IconButton
              variant="plain"
              sx={{ ml: 1 }}
              onClick={() => onChange(chroma.random().hex())}
            >
              <Icon>casino</Icon>
            </IconButton>
          </Tooltip>
        </Box>
      </Card>
      <Menu
        id="color-picker-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(undefined)}
        aria-labelledby="color-picker-button"
        sx={{
          p: 0,
          overflow: 'visible',
          backgroundColor: 'transparent',
          border: 'none',
        }}
      >
        <MenuItem
          sx={{ padding: 0, '&:hover': { backgroundColor: 'inherit' } }}
        >
          <HexColorPicker
            style={{ width: 200 }}
            color={colorHex}
            onChange={onChange}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ColorPicker;
