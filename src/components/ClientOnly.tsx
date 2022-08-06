import React from 'react';
import { useMounted } from '../utils';

export type ClientOnlyProps = {
  children: React.ReactNode;
};

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
