import React, { createContext, useMemo, useState } from 'react';
import { useWindowSize } from '../utils';

export type AppContextType = {
  isMobile: boolean;
  mobileColorMenuOpen: boolean;
  onMobileColorMenuOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultContext: AppContextType = {
  isMobile: false,
  mobileColorMenuOpen: false,
  onMobileColorMenuOpenChange: () => undefined,
};

const AppContext = createContext(defaultContext);

type AppContextProviderProps = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [screenWidth] = useWindowSize();

  const [mobileColorMenuOpen, setMobileColorMenuOpen] = useState(false);

  const isMobile = screenWidth !== undefined && screenWidth < 900;

  const value = useMemo<AppContextType>(
    () => ({
      isMobile,
      mobileColorMenuOpen,
      onMobileColorMenuOpenChange: setMobileColorMenuOpen,
    }),
    [isMobile, mobileColorMenuOpen],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
