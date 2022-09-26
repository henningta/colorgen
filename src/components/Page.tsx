import { Container, ContainerProps, Typography } from '@mui/joy';
import { PageProps } from 'gatsby';
import React from 'react';
import { useAppContext } from '../context';
import { passSx, useMounted } from '../utils';

export type CombinedPageProps<
  DataType = object,
  PageContextType = object,
  LocationState = unknown,
  ServerDataType = object
> = Omit<
  PageProps<DataType, PageContextType, LocationState, ServerDataType>,
  'children'
> &
  ContainerProps & {
    children?: React.ReactNode;
    showPageTitle?: boolean;
  };

const Page: React.FC<CombinedPageProps> = ({
  children,
  title,
  sx,
  showPageTitle,
  datatype,
  pageContext,
  location,
  serverData,
  pageResources,
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
