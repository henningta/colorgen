import React, { useEffect } from 'react';
import { CombinedPageProps, Page } from '../components';
import { useAppContext } from '../context';

const HomePage: React.FC<CombinedPageProps> = ({ ...props }) => {
  const { setNav, isMobile } = useAppContext();

  useEffect(() => {
    setNav(['palette']);
  }, [setNav]);

  return (
    <Page {...props} sx={{ pb: isMobile ? 8 : 16 }}>
      Home page
    </Page>
  );
};

export default HomePage;
