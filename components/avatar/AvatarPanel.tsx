'use client';

import { useAvatarStore } from '@/store/avatarStore';
import { AvatarScene } from '@/components/avatar/AvatarScene';
import { AvatarControls } from '@/components/avatar/AvatarControls';
import { AvatarStatusOverlay } from '@/components/avatar/AvatarStatusOverlay';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export function AvatarPanel() {
  const status = useAvatarStore((s) => s.status);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-gradient-to-b from-brand-50/50 to-card dark:from-brand-950/20 dark:to-card overflow-hidden shadow-soft">
      <div className="flex items-center justify-between border-b border-border bg-card/50 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">AI Avatar</p>
            <p className="text-xs text-muted-foreground capitalize">{status}</p>
          </div>
        </div>
        <AvatarStatusOverlay />
      </div>

      <div className="relative flex-1 min-h-[300px]">
        <motion.div
          key={status}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <AvatarScene />
        </motion.div>

        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-300 border-t-brand-600" />
              <p className="text-sm text-muted-foreground">Loading avatar...</p>
            </div>
          </div>
        )}
      </div>

      <AvatarControls />
    </div>
  );
}
