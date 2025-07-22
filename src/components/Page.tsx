import React from 'react';
import { Container, type ContainerProps } from '@mui/material';
import { passSx } from '../utils';

export type PageProps = ContainerProps;

const Page: React.FC<PageProps> = ({ children, sx, ...props }) => (
  <Container {...props} sx={[{ py: 4 }, ...passSx(sx)]}>
    {children}
  </Container>
);

export default Page;
