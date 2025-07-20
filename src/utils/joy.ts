import { type Theme } from '@mui/joy';
import { type SxProps } from '@mui/system';

// eslint-disable-next-line
export const passSx = (sx?: SxProps<Theme>): any[] =>
  Array.isArray(sx) ? sx : [sx];
