import { create } from 'zustand';

export const useCursorStore = create((set) => ({
  variant: 'default',
  artistId: null,
  setVariant: (variant, artistId = null) => set({ variant, artistId }),
}));
