import { create } from 'zustand';

export const useScrollStore = create((set) => ({
  isScrolling: false,
  setScrolling: (v) => set({ isScrolling: v }),
}));
