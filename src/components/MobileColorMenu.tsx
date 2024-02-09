import React, { useEffect, useRef, useState } from 'react';
import { SnackbarProvider, useAppContext, useColorContext } from '../context';
import {
  Box,
  Button,
  Drawer,
  DrawerProps,
  IconButton,
  Sheet,
  Slider,
  Stack,
  styled,
  Tooltip,
  Typography,
} from '@mui/joy';
import ColorPicker from './ColorPicker';
import chroma from 'chroma-js';
import { HexColorPicker } from 'react-colorful';
import { getColorHex, getContrastColor, useOnClickOutside } from '../utils';
import Icon from './Icon';

const drawerBleeding = 80;

const ColorOptionButton = styled(Button)(() => ({
  justifyContent: 'flex-start',
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
}));

type ColorPanelOption = 'hex' | 'rgb' | 'hsl' | 'hsv' | 'cmyk';

export type MobileColorMenuProps = Omit<
  DrawerProps,
  'children' | 'open' | 'onClose'
>;

const MobileColorMenu: React.FC<MobileColorMenuProps> = ({ ...props }) => {
  const { mobileColorMenuOpen, onMobileColorMenuOpenChange } = useAppContext();
  const { color, setColor } = useColorContext();

  const drawerRef = useRef<HTMLDivElement>(null);

  const [activePanel, setActivePanel] = useState<ColorPanelOption>('hex');
  const [chromaColor, setChromaColor] = useState<chroma.Color>();

  const colorHex = getColorHex(color);

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
      disableScrollLock
      hideBackdrop
      slotProps={{
        content: {
          sx: {
            overflow: 'visible',
            bgcolor: 'transparent',
            px: 2,
            pb: 2,
            height: 'auto',
            boxShadow: 'none',
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
        <IconButton
          sx={(theme) => ({
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: -drawerBleeding - 32,
            visibility: 'visible',
            zIndex: theme.zIndex.badge,
            borderRadius: '50%',
            boxShadow: 'sm',
          })}
          style={{ backgroundColor: colorComplement }}
          size="lg"
          onClick={() => onMobileColorMenuOpenChange((prev) => !prev)}
        >
          <Icon sx={{ color: complementContrast }}>
            {mobileColorMenuOpen ? 'close' : 'palette'}
          </Icon>
        </IconButton>
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
          <Sheet
            sx={(theme) => ({
              height: '100%',
              borderRadius: theme.radius.lg,
              boxShadow: 'lg',
            })}
          >
            <Stack justifyContent="flex-end" sx={{ height: '100%' }}>
              <ColorPicker
                value={color}
                onChange={setColor}
                sx={{
                  boxShadow: 'none',
                  border: 'none',
                  backgroundColor: 'transparent',
                }}
              />
            </Stack>
          </Sheet>
        </Box>
        <Sheet
          sx={(theme) => ({
            py: 2,
            borderRadius: theme.radius.lg,
            boxShadow: 'lg',
          })}
        >
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
                    <Typography level="body-sm">Red</Typography>
                    <Slider
                      value={chromaColor.get('rgb.r')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('rgb.r', value as number).hex(),
                        )
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
                    <Typography level="body-sm">Green</Typography>
                    <Slider
                      value={chromaColor.get('rgb.g')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('rgb.g', value as number).hex(),
                        )
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
                    <Typography level="body-sm">Blue</Typography>
                    <Slider
                      value={chromaColor.get('rgb.b')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('rgb.b', value as number).hex(),
                        )
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
                    <Typography level="body-sm">Hue</Typography>
                    <Slider
                      value={chromaColor.get('hsl.h')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('hsl.h', value as number).hex(),
                        )
                      }
                      max={360}
                      valueLabelDisplay="auto"
                      sx={{ py: 1 }}
                    />
                  </Stack>
                  <Stack>
                    <Typography level="body-sm">HSL Saturation</Typography>
                    <Slider
                      value={chromaColor.get('hsl.s')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('hsl.s', value as number).hex(),
                        )
                      }
                      max={1}
                      step={0.01}
                      valueLabelDisplay="auto"
                      sx={{ py: 1 }}
                    />
                  </Stack>
                  <Stack>
                    <Typography level="body-sm">Lightness</Typography>
                    <Slider
                      value={chromaColor.get('hsl.l')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('hsl.l', value as number).hex(),
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
                    <Typography level="body-sm">Hue</Typography>
                    <Slider
                      value={chromaColor.get('hsv.h')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('hsv.h', value as number).hex(),
                        )
                      }
                      max={360}
                      valueLabelDisplay="auto"
                      sx={{ py: 1 }}
                    />
                  </Stack>
                  <Stack>
                    <Typography level="body-sm">HSV Saturation</Typography>
                    <Slider
                      value={chromaColor.get('hsv.s')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('hsv.s', value as number).hex(),
                        )
                      }
                      max={1}
                      step={0.01}
                      valueLabelDisplay="auto"
                      sx={{ py: 1 }}
                    />
                  </Stack>
                  <Stack>
                    <Typography level="body-sm">Value</Typography>
                    <Slider
                      value={chromaColor.get('hsv.v')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('hsv.v', value as number).hex(),
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
                    <Typography level="body-sm">Cyan</Typography>
                    <Slider
                      value={chromaColor.get('cmyk.c')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('cmyk.c', value as number).hex(),
                        )
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
                    <Typography level="body-sm">Magenta</Typography>
                    <Slider
                      value={chromaColor.get('cmyk.m')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('cmyk.m', value as number).hex(),
                        )
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
                    <Typography level="body-sm">Yellow</Typography>
                    <Slider
                      value={chromaColor.get('cmyk.y')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('cmyk.y', value as number).hex(),
                        )
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
                    <Typography level="body-sm">Key</Typography>
                    <Slider
                      value={chromaColor.get('cmyk.k')}
                      onChange={(_, value) =>
                        setColor(
                          chromaColor.set('cmyk.k', value as number).hex(),
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
                  <Icon>ifl</Icon>
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Sheet>
      </SnackbarProvider>
    </Drawer>
  );
};

export default MobileColorMenu;
