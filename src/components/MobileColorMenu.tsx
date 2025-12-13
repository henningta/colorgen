import { useEffect, useRef, useState } from 'react';
import { SnackbarProvider } from '~/context';
import {
  Box,
  Drawer,
  type DrawerProps,
  Fab,
  IconButton,
  Paper,
  Slider,
  SliderProps,
  Stack,
  StackProps,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import ColorPicker from './ColorPicker';
import chroma from 'chroma-js';
import { HexColorPicker } from 'react-colorful';
import { getColorHex, getContrastColor } from '~/utils';
import { ArrowDownToLine, Dices, Palette } from 'lucide-react';
import { useAppStore } from '~/state';
import { useShallow } from 'zustand/shallow';

const drawerBleeding = 80;

const ColorOptionButton = styled(ToggleButton)(() => ({
  color: 'inherit',
  justifyContent: 'flex-start',
  borderTopLeftRadius: '0 !important',
  borderBottomLeftRadius: '0 !important',
  paddingLeft: 16,
}));

type ColorSliderProps = Omit<StackProps, 'color' | 'onChange'> &
  Pick<SliderProps, 'max' | 'step'> & {
    label: string;
    color: chroma.Color;
    channel: string;
    onChange: (value: string) => void;
  };

const ColorSlider: React.FC<ColorSliderProps> = ({
  label,
  color,
  channel,
  onChange,
  max,
  step,
  ...props
}) => (
  <Stack {...props}>
    <Typography variant="body2">{label}</Typography>
    <Slider
      value={color.get(channel)}
      onChange={(_, value) => onChange(color.set(channel, value).hex())}
      max={max}
      step={step}
      valueLabelDisplay="auto"
      sx={{ py: 1 }}
    />
  </Stack>
);

type ColorPanelOption = 'hex' | 'rgb' | 'hsl' | 'hsv' | 'cmyk';

type ColorSliderOpt = Pick<SliderProps, 'max' | 'step'> & {
  label: string;
  channel: string;
};

const panels: Record<Exclude<ColorPanelOption, 'hex'>, ColorSliderOpt[]> = {
  rgb: [
    { label: 'Red', channel: 'rgb.r', max: 255 },
    { label: 'Green', channel: 'rgb.g', max: 255 },
    { label: 'Blue', channel: 'rgb.b', max: 255 },
  ],
  hsl: [
    { label: 'Hue', channel: 'hsl.h', max: 360 },
    { label: 'HSL Saturation', channel: 'hsl.s', max: 1, step: 0.01 },
    { label: 'Lightness', channel: 'hsl.l', max: 1, step: 0.01 },
  ],
  hsv: [
    { label: 'Hue', channel: 'hsv.h', max: 360 },
    { label: 'HSV Saturation', channel: 'hsv.s', max: 1, step: 0.01 },
    { label: 'Value', channel: 'hsv.v', max: 1, step: 0.01 },
  ],
  cmyk: [
    { label: 'Cyan', channel: 'cmyk.c', max: 1, step: 0.05 },
    { label: 'Magenta', channel: 'cmyk.m', max: 1, step: 0.05 },
    { label: 'Yellow', channel: 'cmyk.y', max: 1, step: 0.05 },
    { label: 'Key', channel: 'cmyk.k', max: 1, step: 0.05 },
  ],
};

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
  const {
    mobileColorMenuOpen,
    setMobileColorMenuOpen,
    toggleMobileColorMenuOpen,
  } = useAppStore(
    useShallow((state) => ({
      mobileColorMenuOpen: state.mobileColorMenuOpen,
      setMobileColorMenuOpen: state.setMobileColorMenuOpen,
      toggleMobileColorMenuOpen: state.toggleMobileColorMenuOpen,
    })),
  );

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
      onClose={() => setMobileColorMenuOpen(false)}
      anchor="bottom"
      disableScrollLock
      keepMounted
      sx={{
        display: { xs: 'block', md: 'none' },
      }}
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
          onClick={toggleMobileColorMenuOpen}
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
                sx={{ border: 'none', bgcolor: 'transparent' }}
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
              ) : (
                <Stack justifyContent="space-around" sx={{ height: '100%' }}>
                  {panels[activePanel].map((slider) => (
                    <ColorSlider
                      key={slider.label}
                      color={chromaColor}
                      onChange={onChange}
                      {...slider}
                    />
                  ))}
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
