import { Box, Button, Container, Menu, MenuItem, TextField } from '@mui/joy';
import Card from '@mui/joy/Card';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useColorContext } from '../context';
import { useClientColorScheme, useWindowSize } from '../utils';

const ColorPicker: React.FC = () => {
  const { mode, mounted } = useClientColorScheme();
  const { color, colorHex, setColor } = useColorContext();

  const [anchorEl, setAnchorEl] = useState<HTMLElement>();

  const toggleMenu: React.MouseEventHandler<HTMLAnchorElement> = (e) =>
    setAnchorEl((prev) => (prev ? undefined : e.currentTarget));

  const [screenWidth] = useWindowSize();

  const position =
    !screenWidth || screenWidth >= 900
      ? {
          top: 48,
        }
      : {
          bottom: 16,
        };

  return (
    <>
      <Container
        sx={{
          ...position,
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 32,
        }}
        maxWidth="sm"
      >
        <Card
          sx={{
            p: 0,
            height: 56,
            width: '100%',
            flexDirection: 'row',
            boxShadow: 'md',
          }}
        >
          <Button
            id="color-picker-button"
            variant="plain"
            color="neutral"
            sx={{
              mt: 'auto',
              height: '100%',
              minWidth: 80,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            onClick={toggleMenu}
          >
            Hex
          </Button>
          <Box
            sx={{
              width: '2px',
              height: '100%',
              backgroundColor: mounted
                ? mode === 'dark'
                  ? '#333'
                  : '#ccc'
                : undefined,
            }}
          />
          <Box
            sx={{ px: 2, display: 'flex', alignItems: 'center', width: '100%' }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                backgroundColor: colorHex,
                borderRadius: '50%',
              }}
            />
            <TextField
              variant="soft"
              value={color}
              onChange={(e) => setColor(e.currentTarget.value)}
              sx={{ ml: 2, width: 0, flex: 1 }}
            />
          </Box>
        </Card>
      </Container>
      <Menu
        id="color-picker-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(undefined)}
        aria-labelledby="color-picker-button"
      >
        <MenuItem>
          <HexColorPicker
            style={{ width: 200 }}
            color={colorHex}
            onChange={setColor}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ColorPicker;
