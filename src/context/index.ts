import { useContext } from 'react';
import SnackbarContext from './SnackbarContext';
import ColorContext from './ColorContextTypes';
import AppContext from './AppContext';
import { useStore } from 'zustand';
import { ColorStore } from './ColorContextTypes';

export const useAppContext = () => useContext(AppContext);
export const useColorContext = () => useContext(ColorContext);
export const useColorStore = <T>(selector: (state: ColorStore) => T) => {
  const store = useColorContext();
  // TODO: is this needed?
  // eslint-disable-next-line
  if (!store) {
    throw new Error('Missing ColorStoreProvider');
  }
  return useStore(store, selector);
};
export const useSnackbarContext = () => useContext(SnackbarContext);

export { default as AppContext } from './AppContext';
export * from './AppContext';

export { default as AppThemeProvider } from './AppThemeProvider';
export * from './AppThemeProvider';

export * from './ColorContext';

export { default as SnackbarContext } from './SnackbarContext';
export * from './SnackbarContext';
