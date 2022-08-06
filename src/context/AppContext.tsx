import React, { createContext, useContext, useMemo, useState } from 'react';
import { useWindowSize } from '../utils';

export type AppContextType = {
  bannerPosition: 'top' | 'left';
  setBannerPosition: (position: 'top' | 'left') => void;
  isMobile: boolean;
  nav: string[];
  setNav: (nav: string[]) => void;
};

const defaultContext: AppContextType = {
  bannerPosition: 'top',
  setBannerPosition: () => undefined,
  isMobile: false,
  nav: ['palette'],
  setNav: () => undefined,
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
  const [screenWidth] = useWindowSize();

  const [bannerPosition, setBannerPosition] = useState(
    defaultContext.bannerPosition
  );
  const [nav, setNav] = useState(defaultContext.nav);

  const isMobile = screenWidth !== undefined && screenWidth < 900;

  const actualBannerPosition = isMobile ? 'top' : bannerPosition;

  const value = useMemo(
    () => ({
      bannerPosition: actualBannerPosition,
      setBannerPosition,
      isMobile,
      nav,
      setNav,
    }),
    [actualBannerPosition, isMobile, nav]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;