import { Box, Sheet, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { useMounted } from '../utils';
import Spinner from './Spinner';

import 'styles/splash.css';

const Splash: React.FC = () => {
  const mounted = useMounted();
  const [display, setDisplay] = useState('flex');

  useEffect(() => {
    if (mounted) {
      setTimeout(() => {
        setDisplay('none');
      }, 1000);
    }
  }, [mounted]);

  return (
    <Sheet
      className="splash"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 999,
        display,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: mounted ? 0 : 1,
        visibility: mounted ? 'hidden' : 'visible',
        transition: '500ms all ease-in-out',
      }}
    >
      <Spinner />
      <Box>
        <Typography sx={{ fontSize: 20, mt: 2, ml: 1 }}>Loading…</Typography>
      </Box>
    </Sheet>
  );
};

export default Splash;
