import {
  Box,
  Button,
  Container,
  Sheet,
  SheetProps,
  Typography,
} from '@mui/joy';
import { navigate } from 'gatsby';
import React from 'react';
import { passSx } from '../utils';
import Icon from './Icon';

export type FooterProps = SheetProps;

const Footer: React.FC<FooterProps> = ({ sx, ...props }) => (
  <Sheet
    {...props}
    sx={[
      (theme) => ({
        height: '72px',
        position: 'relative',
        mt: '-160px',
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
        <Button variant="soft" onClick={() => void navigate('/about')}>
          About
        </Button>
      </Container>
    </Box>
  </Sheet>
);

export default Footer;
