import { Box, Typography } from '@mui/joy';
import Card from '@mui/joy/Card';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import chroma, { InterpolationMode } from 'chroma-js';
import React, { useEffect, useState } from 'react';
import { ColorCard, ColorPicker, Page, ValueAdjust } from '../components';
import { useAppContext, useColorContext } from '../context';

type PaletteShadesProps = {
  colorHex: string;
  tints?: number;
  shades?: number;
  whitePoint?: string;
  blackPoint?: string;
  mode?: InterpolationMode;
};

const PaletteShades: React.FC<PaletteShadesProps> = ({
  colorHex,
  tints = 5,
  shades = 5,
  whitePoint = '#fff',
  blackPoint = '#000',
  mode = 'rgb',
}) => {
  const paletteTints = [...Array(tints).keys()].map((x) => ({
    id: x,
    color: chroma.mix(colorHex, whitePoint, (tints - x) / tints, mode),
  }));

  const paletteShades = [...Array(shades).keys()].map((x) => ({
    id: x,
    color: chroma.mix(colorHex, blackPoint, (x + 1) / shades, mode),
  }));

  const size = 80;

  return (
    <Box sx={{ display: 'flex', overflowX: 'auto', p: 2 }}>
      {paletteTints.map((x) => (
        <ColorCard
          key={x.id}
          colorHex={x.color.hex()}
          width={size}
          height={size}
          sx={{ ml: 1 }}
        />
      ))}
      <ColorCard
        colorHex={colorHex}
        width={size}
        height={size}
        sx={{ ml: 1 }}
      />
      {paletteShades.map((x) => (
        <ColorCard
          key={x.id}
          colorHex={x.color.hex()}
          width={size}
          height={size}
          sx={{ ml: 1 }}
        />
      ))}
    </Box>
  );
};

const Palette: React.FC = () => {
  const { colorHex, setColor } = useColorContext();
  const { setBannerPosition, setNav } = useAppContext();

  const [interpolationMode, setInterpolationMode] =
    useState<InterpolationMode>('rgb');

  const [tints, setTints] = useState(5);
  const [shades, setShades] = useState(5);

  const [whitePointInput, setWhitePointInput] = useState('#fff');
  const [blackPointInput, setBlackPointInput] = useState('#000');
  const [whitePoint, setWhitePoint] = useState(whitePointInput);
  const [blackPoint, setBlackPoint] = useState(blackPointInput);

  const rgbRed = chroma(colorHex).rgb()[0];
  const rgbGreen = chroma(colorHex).rgb()[1];
  const rgbBlue = chroma(colorHex).rgb()[2];

  const hslHue = chroma(colorHex).hsl()[0];
  const hslSaturation = chroma(colorHex).hsl()[1];
  const hslLightness = chroma(colorHex).hsl()[2];

  const hsvHue = chroma(colorHex).hsv()[0];
  const hsvSaturation = chroma(colorHex).hsv()[1];
  const hsvValue = chroma(colorHex).hsv()[2];

  const setChannelValue = (modeChannel: string, value: string | number) => {
    const updated = chroma(colorHex).set(modeChannel, value);
    setColor(updated.hex());
  };

  useEffect(() => {
    setBannerPosition('left');
    setNav([]);
  }, [setBannerPosition, setNav]);

  useEffect(() => {
    chroma.valid(whitePointInput) && setWhitePoint(whitePointInput);
  }, [whitePointInput]);

  useEffect(() => {
    chroma.valid(blackPointInput) && setBlackPoint(blackPointInput);
  }, [blackPointInput]);

  return (
    <Page sx={{ py: 16 }}>
      <PaletteShades
        colorHex={colorHex}
        tints={tints}
        shades={shades}
        whitePoint={whitePoint}
        blackPoint={blackPoint}
        mode={interpolationMode}
      />
      <Card sx={{ mt: 12 }}>
        <Typography level="h4">Palette Mode</Typography>
        <Select
          variant="soft"
          value={interpolationMode}
          onChange={(value) => setInterpolationMode(value as InterpolationMode)}
          sx={{ mt: 2 }}
        >
          <Option value="rgb">RGB</Option>
          <Option value="hsl">HSL</Option>
          <Option value="hsv">HSV</Option>
          <Option value="hsi">HSI</Option>
          <Option value="lab">LAB</Option>
          <Option value="lch">LCH</Option>
          <Option value="hcl">HCL</Option>
          <Option value="lrgb">LRGB</Option>
        </Select>
      </Card>
      <Box sx={{ mx: -2, mt: 2, display: 'flex', flexWrap: 'wrap' }}>
        <Card sx={{ m: 2, flex: 1, minWidth: 300 }}>
          <Box>
            <Typography level="h4">Tints</Typography>
            <ColorPicker
              value={whitePointInput}
              onChange={setWhitePointInput}
              sx={{ mt: 2 }}
            />
            <ValueAdjust
              title="Amount"
              value={tints}
              onChange={setTints}
              max={12}
              marks
              sx={{ mt: 2 }}
            />
          </Box>
        </Card>
        <Card sx={{ m: 2, flex: 1, minWidth: 300 }}>
          <Box>
            <Typography level="h4">Shades</Typography>
            <ColorPicker
              value={blackPointInput}
              onChange={setBlackPointInput}
              sx={{ mt: 2 }}
            />
            <ValueAdjust
              title="Amount"
              value={shades}
              onChange={setShades}
              max={12}
              marks
              sx={{ mt: 2 }}
            />
          </Box>
        </Card>
      </Box>
      <Card sx={{ display: 'flex', mt: 2 }}>
        <Typography level="h4">RGB</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', m: -2 }}>
          <ValueAdjust
            title="Red"
            value={rgbRed}
            onChange={(value) => setChannelValue('rgb.r', value)}
            max={255}
            sx={{ flex: 1, m: 2 }}
          />
          <ValueAdjust
            title="Green"
            value={rgbGreen}
            onChange={(value) => setChannelValue('rgb.g', value)}
            max={255}
            sx={{ flex: 1, m: 2 }}
          />
          <ValueAdjust
            title="Blue"
            value={rgbBlue}
            onChange={(value) => setChannelValue('rgb.b', value)}
            max={255}
            sx={{ flex: 1, m: 2 }}
          />
        </Box>
      </Card>
      <Card sx={{ display: 'flex', mt: 4 }}>
        <Typography level="h4">HSL</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', m: -2 }}>
          <ValueAdjust
            title="Hue"
            value={isNaN(hslHue) ? 0 : hslHue}
            valueDisplay={isNaN(hslHue) ? 'N/A' : hslHue}
            onChange={(value) => setChannelValue('hsl.h', value)}
            step={1}
            max={359}
            sx={{ flex: 1, m: 2 }}
            disabled={isNaN(hslHue)}
          />
          <ValueAdjust
            title="Saturation"
            value={hslSaturation}
            onChange={(value) => setChannelValue('hsl.s', value)}
            max={1}
            step={0.01}
            sx={{ flex: 1, m: 2 }}
            disabled={hslSaturation === 0}
          />
          <ValueAdjust
            title="Lightness"
            value={hslLightness}
            onChange={(value) => setChannelValue('hsl.l', value)}
            max={1}
            step={0.01}
            sx={{ flex: 1, m: 2 }}
          />
        </Box>
      </Card>
      <Card sx={{ display: 'flex', mt: 4 }}>
        <Typography level="h4">HSV</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', m: -2 }}>
          <ValueAdjust
            title="Hue"
            value={isNaN(hsvHue) ? 0 : hsvHue}
            valueDisplay={isNaN(hsvHue) ? 'N/A' : hsvHue}
            onChange={(value) => setChannelValue('hsv.h', value)}
            step={1}
            max={359}
            sx={{ flex: 1, m: 2 }}
            disabled={isNaN(hsvHue)}
          />
          <ValueAdjust
            title="Saturation"
            value={hsvSaturation}
            onChange={(value) => setChannelValue('hsv.s', value)}
            max={1}
            step={0.01}
            sx={{ flex: 1, m: 2 }}
            disabled={hsvSaturation === 0}
          />
          <ValueAdjust
            title="Value"
            value={hsvValue}
            onChange={(value) => setChannelValue('hsv.v', value)}
            max={1}
            step={0.01}
            sx={{ flex: 1, m: 2 }}
          />
        </Box>
      </Card>
    </Page>
  );
};

export default Palette;
