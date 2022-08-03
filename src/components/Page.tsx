import { Container, Typography } from '@mui/joy';
import React from 'react';
import Seo, { SeoProps } from './Seo';

export type PageProps = SeoProps & {
  children?: React.ReactNode;
};

const Page: React.FC<PageProps> = ({ children, title, ...props }) => (
  <Container sx={{ py: 4 }}>
    <Seo {...props} title={title} />
    {title && (
      <Typography level="h1" mb={4}>
        {title}
      </Typography>
    )}
    {children}
  </Container>
);

export default Page;
