'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useUIStore } from '@/store/uiStore';

export function useThemeSync() {
  const { theme, setTheme } = useTheme();
  const setHighContrast = useUIStore((s) => s.setHighContrast);
  const setLargeText = useUIStore((s) => s.setLargeText);
  const setAccessibilityMode = useUIStore((s) => s.setAccessibilityMode);

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', useUIStore.getState().highContrast);
    document.documentElement.classList.toggle('large-text', useUIStore.getState().largeText);
  }, [setHighContrast, setLargeText]);

  return { theme, setTheme };
}
