import { Theme } from '@mui/joy';
import { SxProps } from '@mui/system';

// eslint-disable-next-line
export const passSx = (sx?: SxProps<Theme>): any[] =>
  Array.isArray(sx) ? sx : [sx];
