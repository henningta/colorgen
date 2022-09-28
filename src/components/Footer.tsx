import { Box, Container, Sheet, SheetProps, Typography } from '@mui/joy';
import React from 'react';
import { passSx } from '../utils';
import Icon from './Icon';
import { RouterButton } from '../components';

export type FooterProps = SheetProps;

const Footer: React.FC<FooterProps> = ({ sx, ...props }) => (
  <Sheet
    {...props}
    sx={[
      (theme) => ({
        height: '72px',
        position: 'relative',
        mt: '-152px',
        clear: 'both',

        [theme.breakpoints.up('md')]: {
          mt: '-72px',
        },
      }),
      ...passSx(sx),
    ]}
  >
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mx: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Made with</Typography>
          <Icon
            sx={{ ml: '6px' }}
            style={{ fontSize: 18, color: '#c41e3a' }}
            fill
          >
            favorite
          </Icon>
        </Box>
        <RouterButton variant="soft" href="/about">
          About
        </RouterButton>
      </Container>
    </Box>
  </Sheet>
);

export default Footer;
