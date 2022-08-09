import {
  Box,
  Button,
  Menu,
  MenuItem,
  Sheet,
  TextField,
  useColorScheme,
} from '@mui/joy';
import Card, { CardProps } from '@mui/joy/Card';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { debounce, getColorHex, passSx } from '../utils';

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
  const [input, setInput] = useState(value);
  const [colorHex, setColorHex] = useState(getColorHex(value));

  const debounceOnChange = useMemo(
    () => debounce((value: string) => onChange(value), 100),
    [onChange]
  );

  useLayoutEffect(() => {
    const hex = getColorHex(value);

    if (hex) {
      setColorHex(hex);
    }
  }, [value]);

  useEffect(() => {
    debounceOnChange(input);
  }, [debounceOnChange, input]);

  useEffect(() => {
    setInput(value);
  }, [value]);

  const toggleMenu: React.MouseEventHandler<HTMLAnchorElement> = (e) =>
    setAnchorEl((prev) => (prev ? undefined : e.currentTarget));

  return (
    <>
      <Card
        variant="plain"
        sx={[
          {
            p: 0,
            height: 40,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            boxShadow: 'none',
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
          }}
          onClick={toggleMenu}
        >
          Select
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
            sx={{
              width: 28,
              height: 28,
              backgroundColor: colorHex,
              borderRadius: '50%',
            }}
          />
          <TextField
            variant="soft"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            sx={{ ml: 2, width: 0, flex: 1 }}
          />
        </Box>
      </Card>
      <Menu
        id="color-picker-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(undefined)}
        aria-labelledby="color-picker-button"
      >
        <MenuItem sx={{ '&:hover': { backgroundColor: 'inherit' } }}>
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
