import {
  Box,
  type BoxProps,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { passSx } from '~/utils';
import { RouterButton } from '~/components';
import { useLocation } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

export type FooterProps = BoxProps;

const Footer: React.FC<FooterProps> = ({ sx, ...props }) => {
  const location = useLocation();

  const isColorPage = location.pathname.startsWith('/color');

  return (
    <Box
      className={isColorPage ? 'is-color-page' : undefined}
      sx={[
        {
          height: 72,
          position: 'relative',
          mt: -9,
          clear: 'both',

          '&.is-color-page': {
            mt: { xs: -19, md: -9 },
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
          <Stack direction="row" alignItems="center" gap={0.75}>
            <Typography>Made with</Typography>
            <Heart size={18} color="#c41e3a" strokeWidth={2.5} />
          </Stack>
          <RouterButton to="/about" variant="contained">
            About
          </RouterButton>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
