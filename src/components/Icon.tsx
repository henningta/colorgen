// TODO: replace google font w/ npm package when Joy UI officially supports icon components

import { Box, BoxProps } from '@mui/joy';
import React from 'react';

export type IconProps = BoxProps & {
  children: React.ReactNode;
};

const Icon: React.FC<IconProps> = ({ children, ...props }) => (
  <Box component="span" className="Icon material-icons" {...props}>
    {children}
  </Box>
);

export default Icon;
