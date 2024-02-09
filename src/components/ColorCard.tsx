import {
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Typography,
} from '@mui/joy';
import Card, { CardProps } from '@mui/joy/Card';
import React from 'react';
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
    <Card
      {...props}
      variant="plain"
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
          my: 1,
          mx: 0.5,
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
        <IconButton
          size="sm"
          onClick={() => void copyHexToClipboard()}
          sx={{ '&:hover': { bgcolor: 'transparent' } }}
        >
          <Icon sx={{ color: contrastText }}>content_copy</Icon>
        </IconButton>
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{
              root: {
                variant: 'plain',
                size: 'sm',
                sx: {
                  '&:hover': { bgcolor: 'transparent' },
                },
              },
            }}
          >
            <Icon sx={{ color: contrastText }}>more_vert</Icon>
          </MenuButton>
          <Menu id="color-card-menu" size="sm" placement="bottom-end">
            <MenuItem onClick={() => void copyHexToClipboard()}>
              Copy Hex
            </MenuItem>
            <MenuItem onClick={() => setColor(colorHex)}>
              Set as Selected Color
            </MenuItem>
          </Menu>
        </Dropdown>
      </Stack>
      {displayHex && (
        <Typography
          textColor={contrastText}
          sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
        >
          {colorHex}
        </Typography>
      )}
    </Card>
  );
};

ColorCard.defaultProps = {
  width: '100%',
  height: '100%',
  displayHex: true,
};

export default ColorCard;
