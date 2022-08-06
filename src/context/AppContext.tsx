import React, { createContext, useContext, useMemo, useState } from 'react';

export type AppContextType = {
  bannerPosition: 'top' | 'left';
  setBannerPosition: (position: 'top' | 'left') => void;
};

const defaultContext: AppContextType = {
  bannerPosition: 'top',
  setBannerPosition: () => undefined,
};

const AppContext = createContext(defaultContext);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('Attempted to consume AppContext without a provider.');
  }
  return context;
};

type AppContextProviderProps = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [bannerPosition, setBannerPosition] = useState(
    defaultContext.bannerPosition
  );

  const value = useMemo(
    () => ({
      bannerPosition,
      setBannerPosition,
    }),
    [bannerPosition, setBannerPosition]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
