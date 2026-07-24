'use client';

import { Loader2, Brain, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAvatarStore } from '@/store/avatarStore';
import { motion, AnimatePresence } from 'framer-motion';

export function AvatarStatusOverlay() {
  const status = useAvatarStore((s) => s.status);

  const config = {
    idle: { icon: CheckCircle2, color: 'text-success', label: 'Ready' },
    thinking: { icon: Brain, color: 'text-warning', label: 'Thinking...' },
    signing: { icon: Loader2, color: 'text-brand-500', label: 'Signing' },
    loading: { icon: Loader2, color: 'text-brand-300', label: 'Loading' },
    error: { icon: AlertCircle, color: 'text-destructive', label: 'Error' },
  } as const;

  const { icon: Icon, color, label } = config[status];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className={`flex items-center gap-1.5 text-xs font-medium ${color}`}
      >
        <Icon className={`h-3.5 w-3.5 ${status === 'thinking' || status === 'signing' || status === 'loading' ? 'animate-spin' : ''}`} />
        {label}
      </motion.div>
    </AnimatePresence>
  );
}
