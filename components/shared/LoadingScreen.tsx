'use client';

import { motion } from 'framer-motion';
import { Logo } from '@/components/brand/Logo';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-hero">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [1, 0.85, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Logo size="lg" />
        </motion.div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-brand-300"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        <p className="text-sm text-brand-200">Loading your conversation space...</p>
      </div>
    </div>
  );
}
