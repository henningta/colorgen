// TODO: replace google font w/ npm package when Joy UI officially supports icon components

import { Box, BoxProps } from '@mui/joy';
import React from 'react';

export type IconProps = BoxProps & {
  children: React.ReactNode;
  fill?: boolean;
};

const Icon: React.FC<IconProps> = ({ children, fill, style, ...props }) => (
  <Box
    {...props}
    component="span"
    className="Icon material-symbols-outlined"
    sx={{ color: 'icon' }}
    style={{
      fontVariationSettings: `"FILL" ${fill ? '1' : '0'}`,
      ...style,
    }}
  >
    {children}
  </Box>
);

export default Icon;
