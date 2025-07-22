import {
  Box,
  Button,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  type PaperProps,
  Stack,
  Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { copyToClipboard, getColorHex, passSx } from '../utils';
import Icon from './Icon';
import chroma from 'chroma-js';
import ColorInput, { type ColorInputProps } from './ColorInput';
import { useSnackbarContext } from '../context';

export type ColorPickerProps = Omit<PaperProps, 'onChange'> &
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
  const { setSnackbar } = useSnackbarContext();

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement>();

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
    <Paper
      sx={[
        {
          p: 0,
          height: 56,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          boxShadow: 'md',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          overflow: 'hidden',
        },
        ...passSx(sx),
      ]}
      {...props}
    >
      {useHexPicker && (
        <>
          <Button
            id="color-picker-menu--button"
            color="inherit"
            onClick={(e) => setMenuAnchor(e.currentTarget)}
            sx={{
              height: '100%',
              minWidth: 80,
              borderTopLeftRadius: 3,
              borderBottomLeftRadius: 3,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            endIcon={<Icon style={{ fontSize: 18 }}>keyboard_arrow_down</Icon>}
          >
            Hex
          </Button>
          <Menu
            id="color-picker--menu"
            anchorEl={menuAnchor}
            open={!!menuAnchor}
            onClose={() => setMenuAnchor(undefined)}
            aria-labelledby="color-picker-menu--button"
            elevation={0}
            disableScrollLock
            slotProps={{
              paper: {
                sx: { bgcolor: 'transparent', overflow: 'visible' },
              },
            }}
          >
            <MenuItem
              sx={{
                padding: 0,
                // bgcolor: 'transparent',
                '&:hover': {
                  bgcolor: 'inherit',
                },
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
        </>
      )}
      <Stack direction="row" sx={{ alignItems: 'center', width: '100%' }}>
        <Box sx={{ width: 72, display: 'flex', justifyContent: 'center' }}>
          {colorHex ? (
            <Paper
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
            <IconButton onClick={() => void copyColorHex()}>
              <Icon>content_copy</Icon>
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ColorPicker;
