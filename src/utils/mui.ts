import { type SxProps, type Theme } from '@mui/material';

// eslint-disable-next-line
export const passSx = (sx?: SxProps<Theme>): any[] =>
  Array.isArray(sx) ? sx : [sx];
