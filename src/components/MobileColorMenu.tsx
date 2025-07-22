import React, { useEffect, useRef, useState } from 'react';
import { SnackbarProvider, useAppContext } from '../context';
import {
  Box,
  Button,
  Drawer,
  type DrawerProps,
  Fab,
  IconButton,
  Paper,
  Slider,
  Stack,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import ColorPicker from './ColorPicker';
import chroma from 'chroma-js';
import { HexColorPicker } from 'react-colorful';
import { getColorHex, getContrastColor, useOnClickOutside } from '../utils';
import Icon from './Icon';

const drawerBleeding = 80;

const ColorOptionButton = styled(Button)(() => ({
  color: 'inherit',
  justifyContent: 'flex-start',
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  paddingLeft: '16px',
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

  useOnClickOutside(drawerRef, (e) => {
    // TODO: scope this just to the ColorPicker autocomplete
    if (!(e.target as HTMLElement).className.includes('MuiAutocomplete'))
      onMobileColorMenuOpenChange(false);
  });

  return (
    <Drawer
      {...props}
      ref={drawerRef}
      open={mobileColorMenuOpen}
      onClose={() => onMobileColorMenuOpenChange(false)}
      anchor="bottom"
      // disableScrollLock
      keepMounted
      hideBackdrop
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
          <Icon sx={{ color: complementContrast }}>
            {mobileColorMenuOpen ? 'close' : 'palette'}
          </Icon>
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
            <Stack sx={{ width: 72 }}>
              <ColorOptionButton
                onClick={() => setActivePanel('hex')}
                sx={{
                  backgroundColor:
                    activePanel === 'hex'
                      ? 'var(--joy-palette-neutral-softBg)'
                      : undefined,
                }}
              >
                Hex
              </ColorOptionButton>
              <ColorOptionButton
                onClick={() => setActivePanel('rgb')}
                sx={{
                  backgroundColor:
                    activePanel === 'rgb'
                      ? 'var(--joy-palette-neutral-softBg)'
                      : undefined,
                }}
              >
                RGB
              </ColorOptionButton>
              <ColorOptionButton
                onClick={() => setActivePanel('hsl')}
                sx={{
                  backgroundColor:
                    activePanel === 'hsl'
                      ? 'var(--joy-palette-neutral-softBg)'
                      : undefined,
                }}
              >
                HSL
              </ColorOptionButton>
              <ColorOptionButton
                onClick={() => setActivePanel('hsv')}
                sx={{
                  backgroundColor:
                    activePanel === 'hsv'
                      ? 'var(--joy-palette-neutral-softBg)'
                      : undefined,
                }}
              >
                HSV
              </ColorOptionButton>
              <ColorOptionButton
                onClick={() => setActivePanel('cmyk')}
                sx={{
                  backgroundColor:
                    activePanel === 'cmyk'
                      ? 'var(--joy-palette-neutral-softBg)'
                      : undefined,
                }}
              >
                CMYK
              </ColorOptionButton>
            </Stack>
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
                      sx={{
                        py: 1,
                        '--Slider-trackBackground': 'red',

                        ':hover': {
                          '--Slider-trackBackground': 'red',
                        },
                      }}
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
                      sx={{
                        py: 1,
                        '--Slider-trackBackground': 'green',

                        ':hover': {
                          '--Slider-trackBackground': 'green',
                        },
                      }}
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
                      sx={{
                        py: 1,
                        '--Slider-trackBackground': 'blue',

                        ':hover': {
                          '--Slider-trackBackground': 'blue',
                        },
                      }}
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
                      sx={{ py: 1 }}
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
                      sx={{ py: 1 }}
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
                      sx={{ py: 1 }}
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
                      sx={{ py: 1 }}
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
                      sx={{ py: 1 }}
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
                      sx={{ py: 1 }}
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
                      sx={{
                        py: 1,
                        '--Slider-trackBackground': 'cyan',

                        ':hover': {
                          '--Slider-trackBackground': 'cyan',
                        },
                      }}
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
                      sx={{
                        py: 1,
                        '--Slider-trackBackground': 'magenta',

                        ':hover': {
                          '--Slider-trackBackground': 'magenta',
                        },
                      }}
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
                      sx={{
                        py: 1,
                        '--Slider-trackBackground': 'yellow',

                        ':hover': {
                          '--Slider-trackBackground': 'yellow',
                        },
                      }}
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
                    />
                  </Stack>
                </Stack>
              )}
            </Box>
            <Stack sx={{ width: 56, alignItems: 'center' }}>
              <Tooltip title="Random" placement="left">
                <IconButton onClick={() => onChange(chroma.random().hex())}>
                  <Icon>ifl</Icon>
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
