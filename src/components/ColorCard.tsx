import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  type PaperProps,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useSnackbarContext } from '../context';
import { copyToClipboard, getContrastColor } from '../utils';
import Icon from './Icon';

export type ColorCardProps = PaperProps & {
  colorHex: string;
  onSetAsSelected: (colorHex: string) => void;
  width?: number | string;
  height?: number | string;
  displayHex?: boolean;
};

const ColorCard: React.FC<ColorCardProps> = ({
  colorHex,
  onSetAsSelected,
  width = '100%',
  height = '100%',
  displayHex = true,
  ...props
}) => {
  const { setSnackbar } = useSnackbarContext();

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement>();

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
    <Paper
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
          size="small"
          onClick={() => void copyHexToClipboard()}
          sx={{ '&:hover': { bgcolor: 'transparent' } }}
        >
          <Icon sx={{ color: contrastText }}>content_copy</Icon>
        </IconButton>
        <IconButton
          // slots={{ root: IconButton }}
          // slotProps={{
          //   root: {
          //     variant: 'plain',
          //     size: 'sm',
          //     sx: {
          //       '&:hover': { bgcolor: 'transparent' },
          //     },
          //   },
          // }}
          onClick={(e) => setMenuAnchor(e.currentTarget)}
        >
          <Icon sx={{ color: contrastText }}>more_vert</Icon>
        </IconButton>
        <Menu
          id="color-card-menu"
          anchorEl={menuAnchor}
          open={!!menuAnchor}
          onClose={() => setMenuAnchor(undefined)}
        >
          <MenuItem onClick={() => void copyHexToClipboard()}>
            Copy Hex
          </MenuItem>
          <MenuItem onClick={() => onSetAsSelected(colorHex)}>
            Set as Selected Color
          </MenuItem>
        </Menu>
      </Stack>
      {displayHex && (
        <Typography
          color={contrastText}
          sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
        >
          {colorHex}
        </Typography>
      )}
    </Paper>
  );
};

export default ColorCard;
