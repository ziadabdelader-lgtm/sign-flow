'use client';

import React, { useEffect, ReactNode, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Wait for i18n to initialize
    if (i18n.isInitialized) {
      setIsInitialized(true);
    } else {
      i18n.on('initialized', () => setIsInitialized(true));
    }

    // Update HTML attributes when language changes
    const handleLanguageChange = (lng: string) => {
      document.documentElement.lang = lng;
      // Keep layout LTR for both languages
      document.documentElement.dir = 'ltr';
    };

    // Set initial language
    handleLanguageChange(i18n.language);

    // Listen for language changes
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
      i18n.off('initialized', () => setIsInitialized(true));
    };
  }, []);

  // Prevent hydration mismatch by not rendering until i18n is ready
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
