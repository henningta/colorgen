// TODO: replace this component with theme overrides once Joy UI officially supports icon components

import { Box, type BoxProps } from '@mui/material';
import React from 'react';
import { passSx } from '../utils';

export type IconProps = BoxProps & {
  children: React.ReactNode;
  fill?: boolean;
};

const Icon: React.FC<IconProps> = ({ children, fill, sx, style, ...props }) => (
  <Box
    {...props}
    component="span"
    className="Icon material-symbols-outlined"
    sx={[{ color: 'icon' }, ...passSx(sx)]}
    style={{
      fontVariationSettings: `"FILL" ${fill ? '1' : '0'}`,
      ...style,
    }}
  >
    {children}
  </Box>
);

export default Icon;
