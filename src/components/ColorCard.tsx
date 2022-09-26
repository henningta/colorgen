import { IconButton, Menu, MenuItem, Stack, Typography } from '@mui/joy';
import Card, { CardProps } from '@mui/joy/Card';
import React, { useState } from 'react';
import { useColorContext, useSnackbarContext } from '../context';
import { copyToClipboard, getContrastColor } from '../utils';
import Icon from './Icon';

export type ColorCardProps = CardProps & {
  colorHex: string;
  width?: number | string;
  height?: number | string;
  displayHex?: boolean;
};

const ColorCard: React.FC<ColorCardProps> = ({
  colorHex,
  width,
  height,
  displayHex,
  ...props
}) => {
  const { setColor } = useColorContext();
  const { setSnackbar } = useSnackbarContext();

  const [anchorEl, setAnchorEl] = useState<HTMLElement>();

  const toggleMenu: React.MouseEventHandler<HTMLElement> = (e) =>
    setAnchorEl((prev) => (prev ? undefined : e.currentTarget));

  const contrastText = getContrastColor(colorHex);

  const copyHexToClipboard = async () => {
    try {
      await copyToClipboard(colorHex);
      setSnackbar({
        icon: { name: 'content_copy' },
        message: <>&ldquo;{colorHex}&rdquo; copied to clipboard.</>,
        dismissable: true,
      });
    } catch (e) {
      console.error('Copy error: ', e);
    }
  };

  return (
    <>
      <Card
        {...props}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 0,
          boxShadow: 'none',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          position: 'relative',
          // minHeight: 120,

          ':hover': {
            '.color-card--toolbar': {
              opacity: 1,
              transition: '300ms opacity cubic-bezier(0.4, 0, 0.2, 1)',
            },
          },
        }}
        style={{
          backgroundColor: colorHex,
          width,
          height,
        }}
      >
        <Stack
          className="color-card--toolbar"
          direction="row"
          sx={{
            py: 1,
            opacity: 0,
            transition: '250ms opacity cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'absolute',
            top: 0,
            right: 0,

            '.JoyIconButton-root': {
              backgroundColor: 'transparent',

              ':hover': {
                backgroundColor: 'transparent',
              },

              '.Icon': { color: contrastText, opacity: 0.75 },
            },
          }}
        >
          <IconButton size="sm" onClick={() => void copyHexToClipboard()}>
            <Icon>content_copy</Icon>
          </IconButton>
          <IconButton
            id="color-card-menu--button"
            size="sm"
            onClick={toggleMenu}
          >
            <Icon>more_vert</Icon>
          </IconButton>
        </Stack>
        {displayHex && (
          <Typography
            level="body2"
            textColor={contrastText}
            sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
          >
            {colorHex}
          </Typography>
        )}
      </Card>
      <Menu
        id="color-card-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(undefined)}
        aria-labelledby="color-card-menu--button"
        size="sm"
        placement="bottom-end"
        onClick={() => setAnchorEl(undefined)}
      >
        <MenuItem onClick={() => void copyHexToClipboard()}>Copy Hex</MenuItem>
        <MenuItem onClick={() => setColor(colorHex)}>
          Set as Selected Color
        </MenuItem>
      </Menu>
    </>
  );
};

ColorCard.defaultProps = {
  width: '100%',
  height: '100%',
  displayHex: true,
};

export default ColorCard;
