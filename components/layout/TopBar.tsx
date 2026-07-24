'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { useUIStore } from '@/store/uiStore';

export function TopBar() {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border glass-strong px-4 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open menu"
        className="lg:hidden h-10 w-10"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
