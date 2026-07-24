'use client';

import { motion } from 'framer-motion';
import { Languages, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TranslationBadgeProps {
  provider: string;
  isTranslating?: boolean;
  className?: string;
}

export function TranslationBadge({ provider, isTranslating, className }: TranslationBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground',
        className
      )}
    >
      {isTranslating ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="h-3 w-3" />
        </motion.div>
      ) : (
        <Languages className="h-3 w-3 text-brand-500" />
      )}
      <span className="capitalize">{provider}</span>
      <span className="text-border">·</span>
      <span>{isTranslating ? 'Translating...' : 'Translated'}</span>
    </div>
  );
}
