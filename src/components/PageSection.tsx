import { Box, BoxProps, Container, Typography } from '@mui/joy';
import React from 'react';
import { passSx } from '../utils';

export type PageSectionProps = BoxProps & {
  children?: React.ReactNode;
  fullPage?: boolean;
  title?: string;
  subtitle?: string | React.ReactNode;
};

const PageSection: React.FC<PageSectionProps> = ({
  children,
  fullPage,
  title,
  subtitle,
  sx,
  ...props
}) => {
  return (
    <Box
      {...props}
      sx={[{ height: fullPage ? '100vh' : 'auto', py: 6 }, ...passSx(sx)]}
    >
      <Container maxWidth={false}>
        {title && (
          <Typography level="h2" fontWeight={600}>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography level="body2" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </Container>
      {children}
    </Box>
  );
};

export default PageSection;
