import { Theme } from '@mui/joy';
import { SxProps } from '@mui/system';

export const passSx = (sx?: SxProps<Theme>): any[] =>
  Array.isArray(sx) ? sx : [sx];
