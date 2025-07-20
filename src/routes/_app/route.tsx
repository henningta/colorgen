import { Footer, Icon, RouterLink } from '../../components';
import {
  Box,
  Container,
  IconButton,
  Sheet,
  Stack,
  useColorScheme,
} from '@mui/joy';
import {
  ClientOnly,
  createFileRoute,
  Outlet,
  useLocation,
} from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  component: AppLayout,
});

function AppLayout() {
  const location = useLocation();

  const { mode, setMode } = useColorScheme();

  const hasColorMenu = location.pathname.startsWith('/color');

  return (
    <>
      <Box
        className={hasColorMenu ? 'has-color-menu' : undefined}
        sx={{
          minHeight: '100%',
          pb: '72px',

          '&.has-color-menu': {
            pb: '152px',
          },
        }}
      >
        <Sheet sx={{ zIndex: 24 }}>
          <Container
            maxWidth={false}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 56,
            }}
          >
            <RouterLink
              to="/"
              fontSize={30}
              fontWeight={300}
              underline="none"
              sx={{
                color: 'inherit',
                '&:hover': {
                  color: 'inherit',
                },
              }}
            >
              colorgen.io
            </RouterLink>
            <ClientOnly>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ '.Icon': { fontSize: 20 } }}
              >
                <IconButton
                  size="sm"
                  variant={mode === 'dark' ? 'solid' : 'plain'}
                  onClick={() => setMode('dark')}
                >
                  <Icon sx={{ color: mode === 'dark' ? 'white' : undefined }}>
                    dark_mode
                  </Icon>
                </IconButton>
                <IconButton
                  size="sm"
                  variant={mode === 'system' ? 'solid' : 'plain'}
                  onClick={() => setMode('system')}
                >
                  <Icon sx={{ color: mode === 'system' ? 'white' : undefined }}>
                    computer
                  </Icon>
                </IconButton>
                <IconButton
                  size="sm"
                  variant={mode === 'light' ? 'solid' : 'plain'}
                  onClick={() => setMode('light')}
                >
                  <Icon sx={{ color: mode === 'light' ? 'white' : undefined }}>
                    light_mode
                  </Icon>
                </IconButton>
              </Stack>
            </ClientOnly>
          </Container>
        </Sheet>
        <Box sx={{ position: 'relative', minHeight: '100%' }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default AppLayout;
