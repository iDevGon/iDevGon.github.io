import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ColorMode } from '../interfaces';

export const useColorMode = create<{
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
}>()(
  persist(
    (set) => ({
      colorMode: 'system',
      setColorMode: (colorMode) => set({ colorMode }),
    }),
    {
      name: 'color-mode',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
