import { type Theme } from '@mui/material';
import { type SxProps } from '@mui/system';

// eslint-disable-next-line
export const passSx = (sx?: SxProps<Theme>): any[] =>
  Array.isArray(sx) ? sx : [sx];
