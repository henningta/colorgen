import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useWindowSize } from '../utils';

export type AppContextType = {
  isMobile: boolean;
  mobileColorMenuOpen: boolean;
  onMobileColorMenuOpenChange: (open: boolean) => void;
  scrollLock: boolean;
  setScrollLock: (locked: boolean) => void;
  nav: string[];
  setNav: (nav: string[]) => void;
};

const defaultContext: AppContextType = {
  isMobile: false,
  mobileColorMenuOpen: false,
  onMobileColorMenuOpenChange: () => undefined,
  scrollLock: false,
  setScrollLock: () => undefined,
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
  const [scrollLock, setScrollLock] = useState(false);

  const isMobile = screenWidth !== undefined && screenWidth < 900;

  useEffect(() => {
    if (document) {
      document.body.style.overflow = scrollLock ? 'hidden' : 'unset';
    }
  }, [scrollLock]);

  const value = useMemo<AppContextType>(
    () => ({
      isMobile,
      mobileColorMenuOpen,
      onMobileColorMenuOpenChange: setMobileColorMenuOpen,
      scrollLock,
      setScrollLock,
      nav,
      setNav,
    }),
    [isMobile, mobileColorMenuOpen, scrollLock, nav]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
