import { Container, ContainerProps, Typography } from '@mui/joy';
import React from 'react';
import { useAppContext } from '../context';
import { passSx, useMounted } from '../utils';
import Seo, { SeoProps } from './Seo';

export type PageProps = ContainerProps &
  SeoProps & {
    children?: React.ReactNode;
  };

const Page: React.FC<PageProps> = ({
  children,
  title,
  description,
  image,
  sx,
  ...props
}) => {
  const mounted = useMounted();
  const { isMobile } = useAppContext();

  return (
    <Container
      {...props}
      sx={[
        {
          py: 4,
          transition: '0.5s all ease-in-out',
          visibility: mounted ? 'visible' : 'hidden',
          opacity: mounted ? 1 : 0,
        },
        ...passSx(sx),
      ]}
    >
      <Seo title={title} description={description} image={image} />
      {title && (
        <Typography level={isMobile ? 'h2' : 'h1'} mb={4}>
          {title}
        </Typography>
      )}
      {children}
    </Container>
  );
};

export default Page;
