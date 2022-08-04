import { Sheet, Typography } from '@mui/joy';
import React from 'react';
import { Page } from '../components';
import { useColorContext } from '../context';

const HomePage: React.FC = () => {
  const { colorHex, colorName, contrastText } = useColorContext();

  return (
    <>
      <Sheet
        sx={{
          width: '100%',
          height: 600,
          backgroundColor: colorHex,
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
      </Sheet>
      <Page></Page>
    </>
  );
};

export default HomePage;
