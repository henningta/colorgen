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
import chroma from 'chroma-js';
import ColorInput, { type ColorInputProps } from './ColorInput';
import { useSnackbarContext } from '../context';
import { ChevronDown, CircleDashed, Copy, Dices } from 'lucide-react';

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
        icon: <Copy />,
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
            endIcon={<ChevronDown size={18} style={{ marginTop: 1 }} />}
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
                p: 0,
                '&:hover': {
                  bgcolor: 'inherit',
                },
              }}
            >
              <Stack direction="row">
                <Paper
                  elevation={4}
                  sx={{ borderRadius: 2, bgcolor: 'transparent' }}
                >
                  <HexColorPicker
                    style={{ width: 200 }}
                    color={colorHex}
                    onChange={onChange}
                  />
                </Paper>
                <Stack sx={{ ml: 1, pt: 2 }}>
                  <Tooltip title="Random" placement="right">
                    <Card elevation={4} sx={{ p: 0 }}>
                      <IconButton
                        onClick={() => onChange(chroma.random().hex())}
                      >
                        <Dices />
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
            <CircleDashed size={29} strokeWidth={1.75} />
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
              <Copy />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ColorPicker;
