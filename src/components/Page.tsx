import React from 'react';
import { Container, type ContainerProps, Typography } from '@mui/joy';
import { useAppContext } from '../context';
import { passSx } from '../utils';
import Seo, { type SeoProps } from './Seo';

export type PageProps = SeoProps &
  ContainerProps & {
    showPageTitle?: boolean;
  };

const Page: React.FC<PageProps> = ({
  children,
  title,
  description,
  image,
  sx,
  showPageTitle,
  ...props
}) => {
  const { isMobile } = useAppContext();

  return (
    <Container {...props} sx={[{ py: 4 }, ...passSx(sx)]}>
      {/* <Seo title={title} description={description} image={image} /> */}
      {title && showPageTitle && (
        <Typography level={isMobile ? 'h2' : 'h1'} mb={4}>
          {title}
        </Typography>
      )}
      {children}
    </Container>
  );
};

export default Page;
