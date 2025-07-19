import { type Theme } from '@mui/joy';
import { type SxProps } from '@mui/system';

export const passSx = (sx?: SxProps<Theme>): any[] =>
  Array.isArray(sx) ? sx : [sx];
