// src/store/useHeaderStore.ts
import { create } from "zustand";

type HeaderState = {
  isDarkBg: boolean;
  setIsDarkBg: (isDark: boolean) => void;
};

export const useHeaderStore = create<HeaderState>((set) => ({
  isDarkBg: false,
  setIsDarkBg: (isDark) => set({ isDarkBg: isDark }),
}));
