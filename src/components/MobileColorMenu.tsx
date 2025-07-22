import React, { useEffect, useRef, useState } from 'react';
import { SnackbarProvider, useAppContext } from '../context';
import {
  Box,
  Drawer,
  type DrawerProps,
  Fab,
  IconButton,
  Paper,
  Slider,
  Stack,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import ColorPicker from './ColorPicker';
import chroma from 'chroma-js';
import { HexColorPicker } from 'react-colorful';
import { getColorHex, getContrastColor } from '../utils';
import { ArrowDownToLine, Dices, Palette } from 'lucide-react';

const drawerBleeding = 80;

const ColorOptionButton = styled(ToggleButton)(() => ({
  color: 'inherit',
  justifyContent: 'flex-start',
  borderRadius: 0,
  borderTopLeftRadius: '0 !important',
  borderBottomLeftRadius: '0 !important',
  paddingLeft: 16,
}));

type ColorPanelOption = 'hex' | 'rgb' | 'hsl' | 'hsv' | 'cmyk';

export type MobileColorMenuProps = Omit<
  DrawerProps,
  'children' | 'open' | 'onClose' | 'onChange'
> & {
  value: string;
  onChange: (value: string) => void;
};

const MobileColorMenu: React.FC<MobileColorMenuProps> = ({
  value,
  onChange,
  ...props
}) => {
  const { mobileColorMenuOpen, onMobileColorMenuOpenChange } = useAppContext();

  const drawerRef = useRef<HTMLDivElement>(null);

  const [activePanel, setActivePanel] = useState<ColorPanelOption>('hex');
  const [chromaColor, setChromaColor] = useState<chroma.Color>();

  const colorHex = getColorHex(value);

  const colorComplement = chroma(colorHex ?? 0)
    .set('hsl.h', '+180')
    .hex();
  const complementContrast = getContrastColor(colorComplement);

  useEffect(() => {
    if (colorHex) {
      setChromaColor(chroma(colorHex));
    }
  }, [colorHex]);

  return (
    <Drawer
      {...props}
      ref={drawerRef}
      open={mobileColorMenuOpen}
      onClose={() => onMobileColorMenuOpenChange(false)}
      anchor="bottom"
      disableScrollLock
      keepMounted
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: 'visible',
            bgcolor: 'transparent',
            px: 2,
            pb: 2,
            height: 'auto',
          },
        },
        backdrop: {
          sx: { background: 'none' },
        },
      }}
    >
      <SnackbarProvider
        SnackbarProps={{
          anchorOrigin: { vertical: 'top', horizontal: 'left' },
          sx: {
            position: 'absolute',
            top: -drawerBleeding - 96,
            left: 'auto',
            right: 16,
            visibility: 'visible',
            pointerEvents: 'all',
          },
        }}
      >
        <Fab
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: -drawerBleeding - 32,
            visibility: 'visible',
            borderRadius: '50%',
            boxShadow: 'sm',
          }}
          style={{ backgroundColor: colorComplement }}
          size="medium"
          onClick={() => onMobileColorMenuOpenChange((prev) => !prev)}
        >
          <Stack sx={{ color: complementContrast }}>
            {mobileColorMenuOpen ? <ArrowDownToLine /> : <Palette />}
          </Stack>
        </Fab>
        <Box
          sx={{
            px: 2,
            pt: 0,
            pb: 2,
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            visibility: 'visible',
            right: 0,
            left: 0,
            height: drawerBleeding,
            display: 'flex',
            flexDirection: 'column',
            pointerEvents: 'all',
          }}
        >
          <Paper elevation={4} sx={{ height: '100%', borderRadius: 3 }}>
            <Stack justifyContent="flex-end" sx={{ height: '100%' }}>
              <ColorPicker
                value={value}
                onChange={onChange}
                elevation={0}
                sx={{ border: 'none', backgroundColor: 'transparent' }}
              />
            </Stack>
          </Paper>
        </Box>
        <Paper elevation={4} sx={{ py: 2, borderRadius: 3 }}>
          <Stack direction="row">
            <ToggleButtonGroup
              value={activePanel}
              onChange={(_, value) => setActivePanel(value as ColorPanelOption)}
              exclusive
              orientation="vertical"
              size="small"
              sx={{ width: 72 }}
            >
              <ColorOptionButton value="hex">Hex</ColorOptionButton>
              <ColorOptionButton value="rgb">RGB</ColorOptionButton>
              <ColorOptionButton value="hsl">HSL</ColorOptionButton>
              <ColorOptionButton value="hsv">HSV</ColorOptionButton>
              <ColorOptionButton value="cmyk">CMYK</ColorOptionButton>
            </ToggleButtonGroup>
            <Box sx={{ flex: 1, pl: 2 }}>
              {activePanel === 'hex' ? (
                <HexColorPicker
                  color={colorHex}
                  onChange={onChange}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : !chromaColor ? (
                <Typography
                  sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}
                >
                  Please select a valid color.
                </Typography>
              ) : activePanel === 'rgb' ? (
                <Stack sx={{ height: '100%', justifyContent: 'space-around' }}>
                  <Stack>
                    <Typography variant="body2">Red</Typography>
                    <Slider
                      value={chromaColor.get('rgb.r')}
                      onChange={(_, value) =>
                        onChange(chromaColor.set('rgb.r', value).hex())
                      }
                      max={255}
                      valueLabelDisplay="auto"
                      sx={{ py: '8px !important' }}
                    />
                  </Stack>
                  <Stack>
                    <Typography variant="body2">Green</Typography>
                    <Slider
                      value={chromaColor.get('rgb.g')}
                      onChange={(_, value) =>
                        onChange(chromaColor.set('rgb.g', value).hex())
                      }
                      max={255}
                      valueLabelDisplay="auto"
                      sx={{ py: '8px !important' }}
                    />
                  </Stack>
                  <Stack>
                    <Typography variant="body2">Blue</Typography>
                    <Slider
                      value={chromaColor.get('rgb.b')}
                      onChange={(_, value) =>
                        onChange(chromaColor.set('rgb.b', value).hex())
                      }
                      max={255}
                      valueLabelDisplay="auto"
                      sx={{ py: '8px !important' }}
                    />
                  </Stack>
                </Stack>
              ) : activePanel === 'hsl' ? (
                <Stack sx={{ height: '100%', justifyContent: 'space-around' }}>
                  <Stack>
                    <Typography variant="body2">Hue</Typography>
                    <Slider
                      value={chromaColor.get('hsl.h')}
                      onChange={(_, value) =>
                        onChange(chromaColor.set('hsl.h', value).hex())
                      }
                      max={360}
                      valueLabelDisplay="auto"
                      sx={{ py: '8px !important' }}
                    />
                  </Stack>
                  <Stack>
                    <Typography variant="body2">HSL Saturation</Typography>
                    <Slider
                      value={chromaColor.get('hsl.s')}
                      onChange={(_, value) =>
                        onChange(chromaColor.set('hsl.s', value).hex())
                      }
                      max={1}
                      step={0.01}
                      valueLabelDisplay="auto"
                      sx={{ py: '8px !important' }}
                    />
                  </Stack>
                  <Stack>
                    <Typography variant="body2">Lightness</Typography>
                    <Slider
                      value={chromaColor.get('hsl.l')}
                      onChange={(_, value) =>
                        onChange(chromaColor.set('hsl.l', value).hex())
                      }
                      max={1}
                      step={0.01}
                      valueLabelDisplay="auto"
                      sx={{ py: '8px !important' }}
                    />
                  </Stack>
                </Stack>
              ) : activePanel === 'hsv' ? (
                <Stack sx={{ height: '100%', justifyContent: 'space-around' }}>
                  <Stack>
                    <Typography variant="body2">Hue</Typography>
                    <Slider
                      value={chromaColor.get('hsv.h')}
                      onChange={(_, value) =>
                        onChange(chromaColor.set('hsv.h', value).hex())
                      }
                      max={360}
                      valueLabelDisplay="auto"
                      sx={{ py: '8px !important' }}
                    />
                  </Stack>
                  <Stack>
                    <Typography variant="body2">HSV Saturation</Typography>
                    <Slider
                      value={chromaColor.get('hsv.s')}
                      onChange={(_, value) =>
                        onChange(chromaColor.set('hsv.s', value).hex())
                      }
                      max={1}
                      step={0.01}
                      valueLabelDisplay="auto"
                      sx={{ py: '8px !important' }}
                    />
                  </Stack>
                  <Stack>
                    <Typography variant="body2">Value</Typography>
                    <Slider
                      value={chromaColor.get('hsv.v')}
                      onChange={(_, value) =>
                        onChange(chromaColor.set('hsv.v', value).hex())
                      }
                      max={1}
                      step={0.01}
                      valueLabelDisplay="auto"
                      sx={{ py: '8px !important' }}
                    />
                  </Stack>
                </Stack>
              ) : (
                <Stack sx={{ height: '100%', justifyContent: 'space-around' }}>
                  <Stack>
                    <Typography variant="body2">Cyan</Typography>
                    <Slider
                      value={chromaColor.get('cmyk.c')}
                      onChange={(_, value) =>
                        onChange(chromaColor.set('cmyk.c', value).hex())
                      }
                      max={1}
                      step={0.05}
                      valueLabelDisplay="auto"
                      sx={{ py: '8px !important' }}
                    />
                  </Stack>
                  <Stack>
                    <Typography variant="body2">Magenta</Typography>
                    <Slider
                      value={chromaColor.get('cmyk.m')}
                      onChange={(_, value) =>
                        onChange(chromaColor.set('cmyk.m', value).hex())
                      }
                      max={1}
                      step={0.05}
                      valueLabelDisplay="auto"
                      sx={{ py: '8px !important' }}
                    />
                  </Stack>
                  <Stack>
                    <Typography variant="body2">Yellow</Typography>
                    <Slider
                      value={chromaColor.get('cmyk.y')}
                      onChange={(_, value) =>
                        onChange(chromaColor.set('cmyk.y', value).hex())
                      }
                      max={1}
                      step={0.05}
                      valueLabelDisplay="auto"
                      sx={{ py: '8px !important' }}
                    />
                  </Stack>
                  <Stack>
                    <Typography variant="body2">Key</Typography>
                    <Slider
                      value={chromaColor.get('cmyk.k')}
                      onChange={(_, value) =>
                        onChange(chromaColor.set('cmyk.k', value).hex())
                      }
                      max={1}
                      step={0.05}
                      valueLabelDisplay="auto"
                      sx={{ py: '8px !important' }}
                    />
                  </Stack>
                </Stack>
              )}
            </Box>
            <Stack sx={{ width: 56, alignItems: 'center' }}>
              <Tooltip title="Random" placement="left">
                <IconButton onClick={() => onChange(chroma.random().hex())}>
                  <Dices />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Paper>
      </SnackbarProvider>
    </Drawer>
  );
};

export default MobileColorMenu;
