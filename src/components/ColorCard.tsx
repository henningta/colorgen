import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  type PaperProps,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { copyToClipboard, getContrastColor, passSx } from '~/utils';
import { Copy, CopyCheck, MoreVertical, PaintBucket } from 'lucide-react';

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
  sx,
  style,
  ...props
}) => {
  const [iconCopied, setIconCopied] = useState(false);
  const [menuCopied, setMenuCopied] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement>();

  const contrastText = getContrastColor(colorHex);

  const copyHexToClipboard = useCallback(
    async (reason: 'icon' | 'menu') => {
      const setCopied = reason === 'icon' ? setIconCopied : setMenuCopied;

      await copyToClipboard(colorHex);
      setCopied(true);

      const timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    },
    [colorHex],
  );

  const CopyIcon = ({ copied }: { copied: boolean }) =>
    copied ? <CopyCheck size={20} /> : <Copy size={20} />;

  return (
    <Paper
      className={menuAnchor ? 'menu-open' : undefined}
      sx={[
        (theme) => ({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 0,
          boxShadow: 'none',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          position: 'relative',

          '.color-card--toolbar': {
            opacity: 0,
            transition: theme.transitions.create('opacity', {
              duration: theme.transitions.duration.shortest,
              easing: theme.transitions.easing.easeInOut,
            }),
          },

          '&.menu-open, :hover': {
            '.color-card--toolbar': {
              opacity: 1,
            },
          },
        }),
        ...passSx(sx),
      ]}
      style={{
        backgroundColor: colorHex,
        width,
        height,
        ...style,
      }}
      {...props}
    >
      <Stack
        className="color-card--toolbar"
        direction="row"
        sx={{
          py: 1,
          px: 0.5,
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        <Tooltip title={iconCopied ? 'Copied!' : 'Copy Hex'}>
          <IconButton
            size="small"
            onClick={() => void copyHexToClipboard('icon')}
            sx={{ color: contrastText }}
          >
            <CopyIcon copied={iconCopied} />
          </IconButton>
        </Tooltip>
        <IconButton
          size="small"
          onClick={(e) => setMenuAnchor(e.currentTarget)}
          sx={{ color: contrastText }}
        >
          <MoreVertical size={20} />
        </IconButton>
        <Menu
          id="color-card-menu"
          anchorEl={menuAnchor}
          open={!!menuAnchor}
          onClose={() => setMenuAnchor(undefined)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={() => void copyHexToClipboard('menu')}>
            <ListItemIcon>
              <CopyIcon copied={menuCopied} />
            </ListItemIcon>
            <ListItemText primary={menuCopied ? 'Copied!' : 'Copy Hex'} />
          </MenuItem>
          <MenuItem onClick={() => onSetAsSelected(colorHex)}>
            <ListItemIcon>
              <PaintBucket size={20} />
            </ListItemIcon>
            <ListItemText primary="Set as Selected Color" />
          </MenuItem>
        </Menu>
      </Stack>
      {displayHex && (
        <Typography
          color={contrastText}
          fontWeight={600}
          sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
        >
          {colorHex}
        </Typography>
      )}
    </Paper>
  );
};

export default ColorCard;
