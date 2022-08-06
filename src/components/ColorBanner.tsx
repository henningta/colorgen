import { Box, Button, Sheet, Typography } from '@mui/joy';
import { navigate } from 'gatsby';
import React from 'react';
import { useAppContext, useColorContext } from '../context';

const ColorBanner: React.FC = () => {
  const { colorHex, colorName, contrastText } = useColorContext();
  const { bannerPosition, isMobile, nav } = useAppContext();

  const styles =
    bannerPosition === 'left'
      ? {
          position: 'fixed',
          top: 0,
          width: 400,
          height: '100vh',
        }
      : {
          width: '100%',
          height: isMobile ? '300px' : '600px',
        };

  return (
    <Sheet
      sx={{
        ...styles,
        zIndex: 12,
        backgroundColor: colorHex,
        transition: '0.3s all ease-in-out',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ color: contrastText, opacity: 0.75 }} level="h5">
          {colorHex}
        </Typography>
        <Typography sx={{ color: contrastText }} level="h1">
          {colorName}
        </Typography>
        {bannerPosition === 'top' && nav.includes('palette') && (
          <Button
            sx={{ color: contrastText, position: 'absolute', bottom: 24 }}
            variant="outlined"
            color="neutral"
            onClick={() => void navigate('/palette')}
          >
            Generate Palette
          </Button>
        )}
      </Box>
    </Sheet>
  );
};

export default ColorBanner;
