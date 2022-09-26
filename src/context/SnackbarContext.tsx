import { Alert, AlertProps, IconButton } from '@mui/joy';
import { Snackbar, SnackbarProps } from '@mui/material';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Icon } from '../components';

export type SnackbarMessage = {
  key: number;
  message: React.ReactNode;
  color?: AlertProps['color'];
  dismissable?: boolean;
};

export type SnackbarContextType = {
  setSnackbar: (snackbar: Omit<SnackbarMessage, 'key'>) => void;
  closeSnackbar: () => void;
};

const defaultContext: SnackbarContextType = {
  setSnackbar: () => undefined,
  closeSnackbar: () => undefined,
};

const SnackbarContext = createContext(defaultContext);

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('Attempted to consume SnackbarContext without a provider.');
  }
  return context;
};

export type SnackbarContextProviderProps = {
  children: React.ReactNode;
  SnackbarProps?: SnackbarProps;
};

export const SnackbarContextProvider: React.FC<
  SnackbarContextProviderProps
> = ({ children, SnackbarProps }) => {
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [activeSnackbar, setActiveSnackbar] = useState<SnackbarMessage>();

  // https://mui.com/material-ui/react-snackbar/#consecutive-snackbars
  useEffect(() => {
    if (snackPack.length && !activeSnackbar) {
      // Set a new snack when we don't have an active one
      setActiveSnackbar({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && activeSnackbar && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, activeSnackbar, open]);

  const setSnackbar = (snackbar: Omit<SnackbarMessage, 'key'>) => {
    setSnackPack((prev) => [
      ...prev,
      { ...snackbar, key: new Date().getTime() },
    ]);
  };

  const onClose = (e: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const onExited = () => {
    setActiveSnackbar(undefined);
  };

  const value = useMemo<SnackbarContextType>(
    () => ({
      setSnackbar,
      closeSnackbar: () => setOpen(false),
    }),
    []
  );

  return (
    <SnackbarContext.Provider value={value}>
      <Snackbar
        key={activeSnackbar?.key}
        open={open}
        onClose={onClose}
        autoHideDuration={6000}
        TransitionProps={{ onExited }}
        {...SnackbarProps}
      >
        <Alert
          color={activeSnackbar?.color}
          sx={{ boxShadow: 'lg' }}
          endDecorator={
            activeSnackbar?.dismissable && (
              <IconButton onClick={onClose}>
                <Icon>close</Icon>
              </IconButton>
            )
          }
        >
          {activeSnackbar?.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
