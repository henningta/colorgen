import React, { useState } from 'react';
import { SwipeableDrawer, SwipeableDrawerProps } from '@mui/material';
import { useAppContext, useColorContext } from '../context';
import {
  Box,
  Button,
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

const drawerBleeding = 80;

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.neutral[300]
      : theme.palette.neutral[700],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const ColorOptionButton = styled(Button)(() => ({
  justifyContent: 'flex-start',
  borderRadius: 0,
}));

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

  const [activePanel, setActivePanel] = useState('hex');

  const colorHex = getColorHex(color);
  const chromaColor = chroma(colorHex);

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
      // disableDiscovery
      // disableScrollLock
      hideBackdrop
    >
      <Sheet
        sx={(theme) => ({
          position: 'absolute',
          top: -drawerBleeding,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: 'visible',
          right: 0,
          left: 0,
          height: 80,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: theme.shadow.lg,
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
        <ColorPicker
          value={color}
          onChange={setColor}
          sx={{
            mt: 'auto',
            boxShadow: 'none',
            border: 'none',
            backgroundColor: 'transparent',
          }}
        />
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
                    ? 'var(--joy-palette-neutral-plainActiveBg)'
                    : undefined,
              }}
            >
              Hex
            </ColorOptionButton>
            <ColorOptionButton
              variant="plain"
              onClick={() => setActivePanel('rgb')}
            >
              RGB
            </ColorOptionButton>
            <ColorOptionButton
              variant="plain"
              onClick={() => setActivePanel('hsl')}
            >
              HSL
            </ColorOptionButton>
            <ColorOptionButton
              variant="plain"
              onClick={() => setActivePanel('hsv')}
            >
              HSV
            </ColorOptionButton>
            <ColorOptionButton
              variant="plain"
              onClick={() => setActivePanel('cmyk')}
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
                    color="danger"
                    sx={{ py: 1 }}
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
                    color="success"
                    sx={{ py: 1 }}
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
                    color="primary"
                    sx={{ py: 1 }}
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
                    sx={{ py: 1 }}
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
                    sx={{ py: 1 }}
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
                    sx={{ py: 1 }}
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
                    sx={{ py: 1 }}
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
