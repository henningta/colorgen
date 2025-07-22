import { Alert, type AlertProps } from '@mui/material';
import { Snackbar, type SnackbarProps } from '@mui/material';
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type SnackbarMessage = {
  key: number;
  icon?: {
    name: string;
    fill?: boolean;
  };
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

export type SnackbarProviderProps = PropsWithChildren<{
  SnackbarProps?: Omit<SnackbarProps, 'open'>;
}>;

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
  SnackbarProps,
}) => {
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

  const onClose: SnackbarProps['onClose'] = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const value = useMemo<SnackbarContextType>(
    () => ({
      setSnackbar,
      closeSnackbar: () => setOpen(false),
    }),
    [],
  );

  return (
    <SnackbarContext.Provider value={value}>
      <Snackbar
        key={activeSnackbar?.key}
        open={open}
        onClose={onClose}
        autoHideDuration={6000}
        // onUnmount={() => setActiveSnackbar(undefined)}
        // size={isMobile ? 'sm' : undefined}
        color={activeSnackbar?.color}
        // startDecorator={
        //   activeSnackbar?.icon && (
        //     <Icon fill={activeSnackbar.icon.fill}>
        //       {activeSnackbar.icon.name}
        //     </Icon>
        //   )
        // }
        // endDecorator={
        //   activeSnackbar?.dismissable && (
        //     <IconButton
        //       onClick={() => setOpen(false)}
        //       sx={{ p: 0, ml: 1, mr: -1 }}
        //     >
        //       <Icon style={{ fontSize: 20 }}>close</Icon>
        //     </IconButton>
        //   )
        // }
        {...SnackbarProps}
      >
        <Alert>{activeSnackbar?.message}</Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
