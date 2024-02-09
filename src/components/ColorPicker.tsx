import {
  Box,
  Divider,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Stack,
  Tooltip,
  useColorScheme,
} from '@mui/joy';
import Card, { CardProps } from '@mui/joy/Card';
import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { copyToClipboard, getColorHex, passSx } from '../utils';
import Icon from './Icon';
import chroma from 'chroma-js';
import ColorInput, { ColorInputProps } from './ColorInput';
import { useSnackbarContext } from '../context';

export type ColorPickerProps = Omit<CardProps, 'onChange'> &
  Pick<ColorInputProps, 'value' | 'onChange'> & {
    useHexPicker?: boolean;
  };

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  useHexPicker,
  sx,
  ...props
}) => {
  const { mode } = useColorScheme();
  const { setSnackbar } = useSnackbarContext();

  const colorHex = getColorHex(value);

  const copyColorHex = async () => {
    if (!colorHex) {
      return;
    }

    try {
      await copyToClipboard(colorHex);
      setSnackbar({
        icon: { name: 'content_copy' },
        message: <>&ldquo;{colorHex}&rdquo; copied to clipboard.</>,
        dismissable: true,
      });
    } catch (e) {
      console.error('Copy error: ', e);
    }
  };

  return (
    <Card
      variant="plain"
      sx={[
        {
          p: 0,
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
      {useHexPicker && (
        <>
          <Dropdown>
            <MenuButton
              id="color-picker-menu--button"
              variant="plain"
              sx={{
                height: '100%',
                minWidth: 80,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              endDecorator={
                <Icon style={{ fontSize: 18 }}>keyboard_arrow_down</Icon>
              }
            >
              Hex
            </MenuButton>
            <Menu
              id="color-picker--menu"
              aria-labelledby="color-picker-menu--button"
              sx={{
                p: 0,
                overflow: 'visible',
                bgcolor: 'transparent',
                boxShadow: 'none',
                border: 'none',
              }}
            >
              <MenuItem
                sx={{
                  padding: 0,
                  '&:hover': { bgcolor: 'inherit !important' },
                }}
              >
                <Stack direction="row">
                  <Box sx={{ boxShadow: 'md' }}>
                    <HexColorPicker
                      style={{ width: 200 }}
                      color={colorHex}
                      onChange={onChange}
                    />
                  </Box>
                  <Stack sx={{ ml: 1, pt: 2 }}>
                    <Tooltip title="Random" placement="right">
                      <Card sx={{ p: 0, boxShadow: 'md' }}>
                        <IconButton
                          variant="plain"
                          onClick={() => onChange(chroma.random().hex())}
                        >
                          <Icon>ifl</Icon>
                        </IconButton>
                      </Card>
                    </Tooltip>
                  </Stack>
                </Stack>
              </MenuItem>
            </Menu>
          </Dropdown>
          <Divider orientation="vertical" />
        </>
      )}
      <Stack direction="row" sx={{ alignItems: 'center', width: '100%' }}>
        <Box sx={{ width: 72, display: 'flex', justifyContent: 'center' }}>
          {colorHex ? (
            <Sheet
              variant="outlined"
              style={{
                width: 28,
                height: 28,
                backgroundColor: colorHex,
                borderRadius: '50%',
              }}
            />
          ) : (
            <Icon style={{ fontSize: 28 }}>pending</Icon>
          )}
        </Box>
        <ColorInput value={value} onChange={onChange} />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ minWidth: 56 }}
        >
          <Tooltip title="Copy Hex" placement="top">
            <IconButton variant="plain" onClick={() => void copyColorHex()}>
              <Icon>content_copy</Icon>
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ColorPicker;
