import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

const ErrorPage: React.FC = () => {
  useEffect(() => {
    void navigate('/', { replace: true });
  }, []);

  return null;
};

export default ErrorPage;
