import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  accessibilityMode: boolean;
  highContrast: boolean;
  largeText: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setAccessibilityMode: (enabled: boolean) => void;
  setHighContrast: (enabled: boolean) => void;
  setLargeText: (enabled: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  accessibilityMode: false,
  highContrast: false,
  largeText: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setAccessibilityMode: (enabled) => set({ accessibilityMode: enabled }),
  setHighContrast: (enabled) => set({ highContrast: enabled }),
  setLargeText: (enabled) => set({ largeText: enabled }),
}));
