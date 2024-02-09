import React, { createContext, useContext, useMemo, useState } from 'react';
import { useWindowSize } from '../utils';

export type AppContextType = {
  isMobile: boolean;
  mobileColorMenuOpen: boolean;
  onMobileColorMenuOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  nav: string[];
  setNav: (nav: string[]) => void;
};

const defaultContext: AppContextType = {
  isMobile: false,
  mobileColorMenuOpen: false,
  onMobileColorMenuOpenChange: () => undefined,
  nav: ['home'],
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

  const [mobileColorMenuOpen, setMobileColorMenuOpen] = useState(false);
  const [nav, setNav] = useState(defaultContext.nav);

  const isMobile = screenWidth !== undefined && screenWidth < 900;

  const value = useMemo<AppContextType>(
    () => ({
      isMobile,
      mobileColorMenuOpen,
      onMobileColorMenuOpenChange: setMobileColorMenuOpen,
      nav,
      setNav,
    }),
    [isMobile, mobileColorMenuOpen, nav],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
