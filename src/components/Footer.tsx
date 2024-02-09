import { Box, Container, Sheet, SheetProps, Typography } from '@mui/joy';
import React from 'react';
import { passSx } from '../utils';
import Icon from './Icon';
import { RouterButton } from './RouterLink';
import { useAppContext } from '@/context';

export type FooterProps = SheetProps;

const Footer: React.FC<FooterProps> = ({ sx, ...props }) => {
  const { nav, isMobile } = useAppContext();

  const hasColorMenu =
    isMobile && !nav.includes('home') && !nav.includes('about');

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
          <RouterButton href="/about">About</RouterButton>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
