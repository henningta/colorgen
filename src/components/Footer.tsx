import { Box, Container, type SheetProps, Typography } from '@mui/joy';
import React from 'react';
import { passSx } from '../utils';
import Icon from './Icon';
import { RouterButton } from './RouterLink';
import { useAppContext } from '../context';
import { useLocation } from '@tanstack/react-router';

export type FooterProps = SheetProps;

const Footer: React.FC<FooterProps> = ({ sx, ...props }) => {
  const location = useLocation();

  const { isMobile } = useAppContext();

  const hasColorMenu =
    isMobile &&
    !location.pathname.startsWith('/home') &&
    !location.pathname.startsWith('/about');

  return (
    <Box
      className={hasColorMenu ? 'has-color-menu' : undefined}
      sx={[
        {
          height: '72px',
          position: 'relative',
          mt: '-72px',
          clear: 'both',

          '&.has-color-menu': {
            mt: '-152px',
          },
        },
        ...passSx(sx),
      ]}
      {...props}
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
          <RouterButton to="/about">About</RouterButton>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
