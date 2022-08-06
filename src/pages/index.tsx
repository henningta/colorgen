import { Box, Typography } from '@mui/joy';
import Card, { CardProps } from '@mui/joy/Card';
import chroma from 'chroma-js';
import React, { useEffect } from 'react';
import { ColorCard, Page } from '../components';
import { useAppContext, useColorContext } from '../context';

type ColorHarmonyProps = CardProps & {
  title: string;
  colors: { id: number; color: string }[];
};

const ColorHarmony: React.FC<ColorHarmonyProps> = ({
  title,
  colors,
  ...props
}) => (
  <Card {...props}>
    <Typography
      level="h4"
      sx={{ mb: 1, textAlign: 'center', whiteSpace: 'nowrap' }}
    >
      {title}
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {colors.map((x) => (
        <ColorCard key={x.id} colorHex={x.color} sx={{ m: 1 }} />
      ))}
    </Box>
  </Card>
);

const HomePage: React.FC = () => {
  const { colorHex } = useColorContext();
  const { setBannerPosition, setNav } = useAppContext();

  useEffect(() => {
    setBannerPosition('top');
    setNav(['palette']);
  }, [setBannerPosition, setNav]);

  return (
    <Page sx={{ pb: 16 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', m: -2 }}>
        <ColorHarmony
          sx={{ flex: 1, m: 2 }}
          title="Complimentary"
          colors={[
            { id: 1, color: chroma(colorHex).set('hsl.h', '+180').hex() },
          ]}
        />
        <ColorHarmony
          sx={{ flex: 1, m: 2 }}
          title="Split Complimentary"
          colors={[
            { id: 1, color: chroma(colorHex).set('hsl.h', '+150').hex() },
            { id: 2, color: chroma(colorHex).set('hsl.h', '+210').hex() },
          ]}
        />
        <ColorHarmony
          sx={{ flex: 1, m: 2 }}
          title="Analogous"
          colors={[
            { id: 1, color: chroma(colorHex).set('hsl.h', '-30').hex() },
            { id: 2, color: chroma(colorHex).set('hsl.h', '+30').hex() },
          ]}
        />
        <ColorHarmony
          sx={{ flex: 1, m: 2 }}
          title="Triadic"
          colors={[
            { id: 1, color: chroma(colorHex).set('hsl.h', '+120').hex() },
            { id: 2, color: chroma(colorHex).set('hsl.h', '-120').hex() },
          ]}
        />
        <ColorHarmony
          sx={{ flex: 1, m: 2 }}
          title="Tetradic Rectangular"
          colors={[
            { id: 1, color: chroma(colorHex).set('hsl.h', '+60').hex() },
            { id: 2, color: chroma(colorHex).set('hsl.h', '+180').hex() },
            { id: 3, color: chroma(colorHex).set('hsl.h', '-120').hex() },
          ]}
        />
        <ColorHarmony
          sx={{ flex: 1, m: 2 }}
          title="Tetradic Square"
          colors={[
            { id: 1, color: chroma(colorHex).set('hsl.h', '+90').hex() },
            { id: 2, color: chroma(colorHex).set('hsl.h', '+180').hex() },
            { id: 3, color: chroma(colorHex).set('hsl.h', '-90').hex() },
          ]}
        />
      </Box>
    </Page>
  );
};

export default HomePage;
