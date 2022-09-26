import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Sheet,
  Stack,
  TextField,
  useColorScheme,
} from '@mui/joy';
import Card, { CardProps } from '@mui/joy/Card';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { copyToClipboard, getColorHex, passSx } from '../utils';
import Icon from './Icon';
import { Tooltip } from '@mui/material';
import chroma from 'chroma-js';
import { useSnackbarContext } from '../context';

export type ColorPickerProps = Omit<CardProps, 'onChange'> & {
  value: string;
  onChange: (color: string) => void;
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

  const [anchorEl, setAnchorEl] = useState<HTMLElement>();

  const colorHex = getColorHex(value);

  const toggleMenu: React.MouseEventHandler<HTMLElement> = (e) =>
    setAnchorEl((prev) => (prev ? undefined : e.currentTarget));

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
        {useHexPicker && (
          <>
            <Button
              id="color-picker-menu--button"
              variant="plain"
              sx={{
                height: '100%',
                minWidth: 80,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
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
          </>
        )}
        <Stack direction="row" sx={{ alignItems: 'center', width: '100%' }}>
          <Box sx={{ width: 72, display: 'flex', justifyContent: 'center' }}>
            <Sheet
              variant="outlined"
              style={{
                width: 28,
                height: 28,
                backgroundColor: colorHex,
                borderRadius: '50%',
              }}
            />
          </Box>
          <TextField
            variant="soft"
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            sx={(theme) => ({
              width: 0,
              flex: 1,
              [theme.breakpoints.down('md')]: { ml: 2 },
            })}
            onFocus={(e) => e.target.select()}
            startDecorator={<Icon>search</Icon>}
            endDecorator={
              <>
                <Tooltip title="Copy Hex" placement="top">
                  <IconButton
                    variant="plain"
                    onClick={() => void copyColorHex()}
                  >
                    <Icon>content_copy</Icon>
                  </IconButton>
                </Tooltip>
              </>
            }
          />
        </Stack>
      </Card>
      <Menu
        id="color-picker--menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(undefined)}
        aria-labelledby="color-picker-menu--button"
        sx={{
          p: 0,
          overflow: 'visible',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          border: 'none',
        }}
      >
        <MenuItem
          sx={{ padding: 0, '&:hover': { backgroundColor: 'inherit' } }}
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
                    <Icon>casino</Icon>
                  </IconButton>
                </Card>
              </Tooltip>
            </Stack>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ColorPicker;
