import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const ErrorPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    void router.replace('/');
  }, [router]);

  return null;
};

export default ErrorPage;
