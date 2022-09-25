import React, { useEffect, useState } from 'react';
import { SwipeableDrawer, SwipeableDrawerProps } from '@mui/material';
import { useAppContext, useColorContext } from '../context';
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
import { getColorHex } from '../utils';
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
  const {
    mobileColorMenuOpen,
    onMobileColorMenuOpenChange,
    scrollLock,
    setScrollLock,
  } = useAppContext();
  const { color, setColor } = useColorContext();

  const [activePanel, setActivePanel] = useState<ColorPanelOption>('hex');
  const [chromaColor, setChromaColor] = useState<chroma.Color>();

  const colorHex = getColorHex(color);

  useEffect(() => {
    if (colorHex) {
      setChromaColor(chroma(colorHex));
    }
  }, [colorHex]);

  return (
    <SwipeableDrawer
      {...props}
      open={mobileColorMenuOpen}
      onOpen={() => onMobileColorMenuOpenChange(true)}
      onClose={() => onMobileColorMenuOpenChange(false)}
      anchor="bottom"
      swipeAreaWidth={drawerBleeding}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: { overflow: 'visible' },
      }}
      disableDiscovery
      // disableScrollLock
      disableSwipeToOpen
      hideBackdrop
    >
      <Sheet
        sx={(theme) => ({
          position: 'absolute',
          top: -drawerBleeding,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          visibility: 'visible',
          right: 0,
          left: 0,
          height: 80,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: theme.shadow.lg,
          pointerEvents: 'all',
        })}
        // onMouseDown={() => setScrollLock(true)}
        // onMouseUp={() => setScrollLock(false)}
        // onTouchStart={() => setScrollLock(true)}
        // onTouchEnd={() => setScrollLock(false)}
        // onMouseDown={() => console.log('mouse down')}
        // onMouseUp={() => console.log('mouse up')}
        // onTouchStart={() => console.log('touch start')}
        // onTouchEnd={() => console.log('touch end')}
      >
        <Puller />
        <Stack direction="row" sx={{ mt: 'auto' }}>
          {/* <Button
            variant="plain"
            sx={{
              m: 'auto',
              width: 80,
              justifyContent: 'flex-start',
              backgroundColor: 'transparent !important',
            }}
            onClick={() => onMobileColorMenuOpenChange((prev) => !prev)}
          >
            {mobileColorMenuOpen ? 'Close' : 'Open'}
          </Button> */}
          {/* <Box
            sx={{
              m: 'auto',
              ml: 1,
              width: 80,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <IconButton
              sx={{ backgroundColor: 'transparent !important' }}
              onClick={() => onMobileColorMenuOpenChange((prev) => !prev)}
            >
              <Icon>{mobileColorMenuOpen ? 'close' : 'menu'}</Icon>
            </IconButton>
          </Box> */}
          <ColorPicker
            value={color}
            onChange={setColor}
            sx={{
              boxShadow: 'none',
              border: 'none',
              backgroundColor: 'transparent',
            }}
          />
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
        </Stack>
      </Sheet>
      <Sheet sx={{ py: 2 }}>
        <Stack direction="row">
          <Stack sx={{ width: 80 }}>
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
          <Box sx={{ flex: 1, px: 2 }}>
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
                      setColor(chromaColor.set('rgb.r', value as number).hex())
                    }
                    max={255}
                    valueLabelDisplay="auto"
                    sx={{
                      py: 1,
                      '--Slider-track-background': 'red',
                      // '--Slider-thumb-color': 'red',
                    }}
                  />
                </Stack>
                <Stack>
                  <Typography level="body3">Green</Typography>
                  <Slider
                    value={chromaColor.get('rgb.g')}
                    onChange={(_, value) =>
                      setColor(chromaColor.set('rgb.g', value as number).hex())
                    }
                    max={255}
                    valueLabelDisplay="auto"
                    sx={{
                      py: 1,
                      '--Slider-track-background': 'green',
                      // '--Slider-thumb-color': 'green',
                    }}
                  />
                </Stack>
                <Stack>
                  <Typography level="body3">Blue</Typography>
                  <Slider
                    value={chromaColor.get('rgb.b')}
                    onChange={(_, value) =>
                      setColor(chromaColor.set('rgb.b', value as number).hex())
                    }
                    max={255}
                    valueLabelDisplay="auto"
                    sx={{
                      py: 1,
                      '--Slider-track-background': 'blue',
                      // '--Slider-thumb-color': 'blue',
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
                      setColor(chromaColor.set('hsl.h', value as number).hex())
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
                      setColor(chromaColor.set('hsl.s', value as number).hex())
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
                      setColor(chromaColor.set('hsl.l', value as number).hex())
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
                      setColor(chromaColor.set('hsv.h', value as number).hex())
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
                      setColor(chromaColor.set('hsv.s', value as number).hex())
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
                      setColor(chromaColor.set('hsv.v', value as number).hex())
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
                      setColor(chromaColor.set('cmyk.c', value as number).hex())
                    }
                    max={1}
                    step={0.05}
                    valueLabelDisplay="auto"
                    sx={{
                      py: 1,
                      '--Slider-track-background': 'cyan',
                      // '--Slider-thumb-color': 'cyan',
                    }}
                  />
                </Stack>
                <Stack>
                  <Typography level="body3">Magenta</Typography>
                  <Slider
                    value={chromaColor.get('cmyk.m')}
                    onChange={(_, value) =>
                      setColor(chromaColor.set('cmyk.m', value as number).hex())
                    }
                    max={1}
                    step={0.05}
                    valueLabelDisplay="auto"
                    sx={{
                      py: 1,
                      '--Slider-track-background': 'magenta',
                      // '--Slider-thumb-color': 'magenta',
                    }}
                  />
                </Stack>
                <Stack>
                  <Typography level="body3">Yellow</Typography>
                  <Slider
                    value={chromaColor.get('cmyk.y')}
                    onChange={(_, value) =>
                      setColor(chromaColor.set('cmyk.y', value as number).hex())
                    }
                    max={1}
                    step={0.05}
                    valueLabelDisplay="auto"
                    sx={{
                      py: 1,
                      '--Slider-track-background': 'yellow',
                      // '--Slider-thumb-color': 'yellow',
                    }}
                  />
                </Stack>
                <Stack>
                  <Typography level="body3">Key</Typography>
                  <Slider
                    value={chromaColor.get('cmyk.k')}
                    onChange={(_, value) =>
                      setColor(chromaColor.set('cmyk.k', value as number).hex())
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
        </Stack>
      </Sheet>
    </SwipeableDrawer>
  );
};

export default MobileColorMenu;
