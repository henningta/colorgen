import { useContext } from 'react';
import SnackbarContext from './SnackbarContext';
import ColorContext from './ColorContext';
import AppContext from './AppContext';

export const useAppContext = () => useContext(AppContext);
export const useColorContext = () => useContext(ColorContext);
export const useSnackbarContext = () => useContext(SnackbarContext);

export { default as AppContext } from './AppContext';
export * from './AppContext';

export { default as AppThemeProvider } from './AppThemeProvider';
export * from './AppThemeProvider';

export { default as ColorContext } from './ColorContext';
export * from './ColorContext';

export { default as SnackbarContext } from './SnackbarContext';
export * from './SnackbarContext';
