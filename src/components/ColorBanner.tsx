import { Box, Button, Sheet, Theme, Typography } from '@mui/joy';
import { SxProps } from '@mui/system';
import { navigate } from 'gatsby';
import React from 'react';
import { useAppContext, useColorContext } from '../context';

const ColorBanner: React.FC = () => {
  const { colorHex, colorName, contrastText } = useColorContext();
  const { bannerPosition, bannerHidden, isMobile, nav } = useAppContext();

  const styles: SxProps<Theme> =
    bannerPosition === 'left'
      ? {
          position: 'fixed',
          top: 0,
          width: 400,
          height: '100vh',
        }
      : {
          width: '100%',
          height: isMobile ? '360px' : '600px',
        };

  return (
    <Sheet
      sx={{
        ...styles,
        zIndex: 12,
        backgroundColor: colorHex,
        transition: '0.3s all ease-in-out',
        p: 3,
        display: bannerHidden ? 'none' : undefined,
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Typography
            sx={{ textAlign: 'center', color: contrastText, opacity: 0.75 }}
            level="h5"
          >
            {colorHex}
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: contrastText,
              textTransform: 'capitalize',
            }}
            level="h1"
          >
            {colorName}
          </Typography>
        </Box>
        {bannerPosition === 'top' && nav.includes('palette') && (
          <Button
            sx={{
              color: contrastText,
              borderColor: contrastText,
            }}
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
