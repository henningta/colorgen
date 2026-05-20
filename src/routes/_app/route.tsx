import { Footer, Header, NavDrawer } from '~/components';
import { Box, Divider } from '@mui/material';
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  component: AppLayout,
});

function AppLayout() {
  const location = useLocation();

  const hasColorMenu = location.pathname.startsWith('/color');

  return (
    <>
      <Box
        className={hasColorMenu ? 'has-color-menu' : undefined}
        sx={{
          minHeight: '100%',
          pb: 9,

          '&.has-color-menu': {
            pb: 19,
          },
        }}
      >
        <Header />
        <Divider />
        <NavDrawer />
        <Box sx={{ position: 'relative', minHeight: '100%' }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </>
  );
}
