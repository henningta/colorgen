import { Footer, RouterLink } from '../../components';
import {
  Box,
  Container,
  Divider,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  useColorScheme,
} from '@mui/material';
import {
  ClientOnly,
  createFileRoute,
  Outlet,
  useLocation,
} from '@tanstack/react-router';
import { LaptopMinimal, Moon, Sun } from 'lucide-react';

type ColorMode = 'light' | 'dark' | 'system';

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
        <Paper elevation={0} sx={{ zIndex: 24 }}>
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
              <ToggleButtonGroup
                size="small"
                value={mode}
                onChange={(_, value) => setMode(value as ColorMode)}
                exclusive
              >
                <ToggleButton value="dark">
                  <Moon size={18} />
                </ToggleButton>
                <ToggleButton value="system">
                  <LaptopMinimal size={18} />
                </ToggleButton>
                <ToggleButton value="light">
                  <Sun size={18} />
                </ToggleButton>
              </ToggleButtonGroup>
            </ClientOnly>
          </Container>
        </Paper>
        <Divider />
        <Box sx={{ position: 'relative', minHeight: '100%' }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default AppLayout;
