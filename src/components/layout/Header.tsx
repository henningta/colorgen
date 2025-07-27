import {
  AppBar,
  AppBarProps,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  useColorScheme,
} from '@mui/material';
import { ClientOnly } from '@tanstack/react-router';
import { Moon, LaptopMinimal, Sun } from 'lucide-react';
import React from 'react';
import { RouterLink } from '~/components';

type ColorMode = 'light' | 'dark' | 'system';

export type HeaderProps = Omit<AppBarProps, 'children'>;

const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const { mode, setMode } = useColorScheme();

  return (
    <AppBar elevation={0} color="inherit" position="relative" {...props}>
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
    </AppBar>
  );
};

export default Header;
