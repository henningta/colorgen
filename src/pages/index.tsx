import { Box, Typography } from '@mui/joy';
import chroma from 'chroma-js';
import React, { useEffect } from 'react';
import { ColorCard, Page } from '../components';
import { useAppContext, useColorContext } from '../context';

const HomePage: React.FC = () => {
  const { colorHex } = useColorContext();
  const { setBannerPosition } = useAppContext();

  useEffect(() => {
    setBannerPosition('top');
  }, [setBannerPosition]);

  return (
    <Page title="Color Harmonies (wip)">
      <Box>
        <Typography level="h4">Complimentary</Typography>
        <Box sx={{ display: 'flex' }}>
          <ColorCard colorHex={chroma(colorHex).set('hsl.h', '+180').hex()} />
        </Box>
      </Box>
      <Box>
        <Typography level="h4">Split Complimentary</Typography>
        <Box sx={{ display: 'flex' }}>
          <ColorCard colorHex={chroma(colorHex).set('hsl.h', '+150').hex()} />
          <ColorCard colorHex={chroma(colorHex).set('hsl.h', '+210').hex()} />
        </Box>
      </Box>
      <Box>
        <Typography level="h4">Analogous</Typography>
        <Box sx={{ display: 'flex' }}>
          <ColorCard colorHex={chroma(colorHex).set('hsl.h', '-30').hex()} />
          <ColorCard colorHex={chroma(colorHex).set('hsl.h', '+30').hex()} />
        </Box>
      </Box>
      <Box>
        <Typography level="h4">Triadic</Typography>
        <Box sx={{ display: 'flex' }}>
          <ColorCard colorHex={chroma(colorHex).set('hsl.h', '+120').hex()} />
          <ColorCard colorHex={chroma(colorHex).set('hsl.h', '-120').hex()} />
        </Box>
      </Box>
      <Box>
        <Typography level="h4">Tetradic Rectangular</Typography>
        <Box sx={{ display: 'flex' }}>
          <ColorCard colorHex={chroma(colorHex).set('hsl.h', '+60').hex()} />
          <ColorCard colorHex={chroma(colorHex).set('hsl.h', '+180').hex()} />
          <ColorCard colorHex={chroma(colorHex).set('hsl.h', '-120').hex()} />
        </Box>
      </Box>
      <Box>
        <Typography level="h4">Tetradic Square</Typography>
        <Box sx={{ display: 'flex' }}>
          <ColorCard colorHex={chroma(colorHex).set('hsl.h', '+90').hex()} />
          <ColorCard colorHex={chroma(colorHex).set('hsl.h', '+180').hex()} />
          <ColorCard colorHex={chroma(colorHex).set('hsl.h', '-90').hex()} />
        </Box>
      </Box>
    </Page>
  );
};

export default HomePage;
