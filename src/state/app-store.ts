import { create } from 'zustand';

export type AppStore = {
  mobileColorMenuOpen: boolean;
  setMobileColorMenuOpen: (mobileColorMenuOpen: boolean) => void;
  toggleMobileColorMenuOpen: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
  mobileColorMenuOpen: false,
  setMobileColorMenuOpen: (mobileColorMenuOpen) => set({ mobileColorMenuOpen }),
  toggleMobileColorMenuOpen: () =>
    set((state) => ({ mobileColorMenuOpen: !state.mobileColorMenuOpen })),
}));
