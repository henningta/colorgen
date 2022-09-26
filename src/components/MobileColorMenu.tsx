import React, { useEffect, useRef, useState } from 'react';
import { SwipeableDrawer, SwipeableDrawerProps, Tooltip } from '@mui/material';
import { SnackbarProvider, useAppContext, useColorContext } from '../context';
import {
  Box,
  Button,
  IconButton,
  Sheet,
  Slider,
  Stack,
  styled,
  Typography,
} from '@mui/joy';
import ColorPicker from './ColorPicker';
import chroma from 'chroma-js';
import { HexColorPicker } from 'react-colorful';
import { getColorHex, useOnClickOutside } from '../utils';
import Icon from './Icon';

const drawerBleeding = 80;

const Puller = styled(Box)(({ theme }) => ({
  width: 40,
  height: 4,
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.neutral[200]
      : theme.palette.neutral[700],
  borderRadius: 2,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 20px)',
}));

const ColorOptionButton = styled(Button)(() => ({
  justifyContent: 'flex-start',
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
}));

type ColorPanelOption = 'hex' | 'rgb' | 'hsl' | 'hsv' | 'cmyk';

export type MobileColorMenuProps = Omit<
  SwipeableDrawerProps,
  'children' | 'open' | 'onOpen' | 'onClose'
>;

const MobileColorMenu: React.FC<MobileColorMenuProps> = ({ ...props }) => {
  const { mobileColorMenuOpen, onMobileColorMenuOpenChange } = useAppContext();
  const { color, setColor } = useColorContext();

  const drawerRef = useRef<HTMLDivElement>(null);

  const [activePanel, setActivePanel] = useState<ColorPanelOption>('hex');
  const [chromaColor, setChromaColor] = useState<chroma.Color>();

  const colorHex = getColorHex(color);

  useEffect(() => {
    if (colorHex) {
      setChromaColor(chroma(colorHex));
    }
  }, [colorHex]);

  useOnClickOutside(drawerRef, () => onMobileColorMenuOpenChange(false));

  return (
    <SwipeableDrawer
      {...props}
      ref={drawerRef}
      open={mobileColorMenuOpen}
      onOpen={() => onMobileColorMenuOpenChange(true)}
      onClose={() => onMobileColorMenuOpenChange(false)}
      anchor="bottom"
      swipeAreaWidth={drawerBleeding}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: { overflow: 'visible' },
      }}
      variant="persistent"
      disableDiscovery
      disableScrollLock
      disableSwipeToOpen
      hideBackdrop
    >
      <SnackbarProvider
        SnackbarProps={{
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          sx: {
            position: 'absolute',
            top: -drawerBleeding - 64,
            visibility: 'visible',
            pointerEvents: 'all',
          },
        }}
      >
        <Sheet
          sx={{
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
            boxShadow: 'lg',
            pointerEvents: 'all',
          }}
        >
          <Puller />
          <Stack direction="row" sx={{ mt: 'auto' }}>
            <ColorPicker
              value={color}
              onChange={setColor}
              sx={{
                boxShadow: 'none',
                border: 'none',
                backgroundColor: 'transparent',
              }}
            />
            <Tooltip
              title={`${mobileColorMenuOpen ? 'Close' : 'Open'} Color Menu`}
              placement="top"
            >
              <IconButton
                sx={{
                  m: 'auto',
                  mr: 1,
                  backgroundColor: 'transparent !important',
                }}
                onClick={() => onMobileColorMenuOpenChange((prev) => !prev)}
              >
                <Icon>{mobileColorMenuOpen ? 'close' : 'menu'}</Icon>
              </IconButton>
            </Tooltip>
          </Stack>
        </Sheet>
        <Sheet sx={{ py: 2 }}>
          <Stack direction="row">
            <Stack sx={{ width: 72 }}>
              <ColorOptionButton
                variant="plain"
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
                variant="plain"
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
                variant="plain"
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
                variant="plain"
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
                variant="plain"
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
                  onChange={setColor}
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
                    <Typography level="body3">Red</Typography>
                    <Slider
                      value={chromaColor.get('rgb.r')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('rgb.r', value as number).hex()
                        )
                      }
                      max={255}
                      valueLabelDisplay="auto"
                      sx={{
                        py: 1,
                        '--Slider-track-background': 'red',

                        ':hover': {
                          '--Slider-track-background': 'red',
                        },
                      }}
                    />
                  </Stack>
                  <Stack>
                    <Typography level="body3">Green</Typography>
                    <Slider
                      value={chromaColor.get('rgb.g')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('rgb.g', value as number).hex()
                        )
                      }
                      max={255}
                      valueLabelDisplay="auto"
                      sx={{
                        py: 1,
                        '--Slider-track-background': 'green',

                        ':hover': {
                          '--Slider-track-background': 'green',
                        },
                      }}
                    />
                  </Stack>
                  <Stack>
                    <Typography level="body3">Blue</Typography>
                    <Slider
                      value={chromaColor.get('rgb.b')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('rgb.b', value as number).hex()
                        )
                      }
                      max={255}
                      valueLabelDisplay="auto"
                      sx={{
                        py: 1,
                        '--Slider-track-background': 'blue',

                        ':hover': {
                          '--Slider-track-background': 'blue',
                        },
                      }}
                    />
                  </Stack>
                </Stack>
              ) : activePanel === 'hsl' ? (
                <Stack sx={{ height: '100%', justifyContent: 'space-around' }}>
                  <Stack>
                    <Typography level="body3">Hue</Typography>
                    <Slider
                      value={chromaColor.get('hsl.h')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('hsl.h', value as number).hex()
                        )
                      }
                      max={360}
                      valueLabelDisplay="auto"
                      sx={{ py: 1 }}
                    />
                  </Stack>
                  <Stack>
                    <Typography level="body3">HSL Saturation</Typography>
                    <Slider
                      value={chromaColor.get('hsl.s')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('hsl.s', value as number).hex()
                        )
                      }
                      max={1}
                      step={0.01}
                      valueLabelDisplay="auto"
                      sx={{ py: 1 }}
                    />
                  </Stack>
                  <Stack>
                    <Typography level="body3">Lightness</Typography>
                    <Slider
                      value={chromaColor.get('hsl.l')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('hsl.l', value as number).hex()
                        )
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
                    <Typography level="body3">Hue</Typography>
                    <Slider
                      value={chromaColor.get('hsv.h')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('hsv.h', value as number).hex()
                        )
                      }
                      max={360}
                      valueLabelDisplay="auto"
                      sx={{ py: 1 }}
                    />
                  </Stack>
                  <Stack>
                    <Typography level="body3">HSV Saturation</Typography>
                    <Slider
                      value={chromaColor.get('hsv.s')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('hsv.s', value as number).hex()
                        )
                      }
                      max={1}
                      step={0.01}
                      valueLabelDisplay="auto"
                      sx={{ py: 1 }}
                    />
                  </Stack>
                  <Stack>
                    <Typography level="body3">Value</Typography>
                    <Slider
                      value={chromaColor.get('hsv.v')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('hsv.v', value as number).hex()
                        )
                      }
                      max={1}
                      step={0.01}
                      valueLabelDisplay="auto"
                      sx={{ py: 1 }}
                    />
                  </Stack>
                </Stack>
              ) : activePanel === 'cmyk' ? (
                <Stack sx={{ height: '100%', justifyContent: 'space-around' }}>
                  <Stack>
                    <Typography level="body3">Cyan</Typography>
                    <Slider
                      value={chromaColor.get('cmyk.c')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('cmyk.c', value as number).hex()
                        )
                      }
                      max={1}
                      step={0.05}
                      valueLabelDisplay="auto"
                      sx={{
                        py: 1,
                        '--Slider-track-background': 'cyan',

                        ':hover': {
                          '--Slider-track-background': 'cyan',
                        },
                      }}
                    />
                  </Stack>
                  <Stack>
                    <Typography level="body3">Magenta</Typography>
                    <Slider
                      value={chromaColor.get('cmyk.m')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('cmyk.m', value as number).hex()
                        )
                      }
                      max={1}
                      step={0.05}
                      valueLabelDisplay="auto"
                      sx={{
                        py: 1,
                        '--Slider-track-background': 'magenta',

                        ':hover': {
                          '--Slider-track-background': 'magenta',
                        },
                      }}
                    />
                  </Stack>
                  <Stack>
                    <Typography level="body3">Yellow</Typography>
                    <Slider
                      value={chromaColor.get('cmyk.y')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('cmyk.y', value as number).hex()
                        )
                      }
                      max={1}
                      step={0.05}
                      valueLabelDisplay="auto"
                      sx={{
                        py: 1,
                        '--Slider-track-background': 'yellow',

                        ':hover': {
                          '--Slider-track-background': 'yellow',
                        },
                      }}
                    />
                  </Stack>
                  <Stack>
                    <Typography level="body3">Key</Typography>
                    <Slider
                      value={chromaColor.get('cmyk.k')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('cmyk.k', value as number).hex()
                        )
                      }
                      max={1}
                      step={0.05}
                      valueLabelDisplay="auto"
                    />
                  </Stack>
                </Stack>
              ) : (
                <></>
              )}
            </Box>
            <Stack sx={{ width: 56, alignItems: 'center' }}>
              <Tooltip title="Random" placement="left">
                <IconButton
                  variant="plain"
                  onClick={() => setColor(chroma.random().hex())}
                >
                  <Icon>casino</Icon>
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Sheet>
      </SnackbarProvider>
    </SwipeableDrawer>
  );
};

export default MobileColorMenu;
