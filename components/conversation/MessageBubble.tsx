'use client';

import { motion } from 'framer-motion';
import { Check, CheckCheck, Volume2, Hand, Mic } from 'lucide-react';
import type { Message } from '@/types/message';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  onSpeak?: (text: string) => void;
  speaking?: boolean;
}

export function MessageBubble({ message, isOwn, onSpeak, speaking }: MessageBubbleProps) {
  const inputIcon = {
    text: null,
    sign_video: <Hand className="h-3 w-3" />,
    voice: <Mic className="h-3 w-3" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={cn('flex flex-col gap-1', isOwn ? 'items-end' : 'items-start')}
    >
      <div className="flex items-center gap-2 px-1">
        {inputIcon[message.input_type] && (
          <span className="text-muted-foreground">{inputIcon[message.input_type]}</span>
        )}
        <span className="text-xs text-muted-foreground">
          {message.sender_type === 'deaf' ? 'Deaf user' : 'Hearing user'}
        </span>
        {message.status === 'read' ? (
          <CheckCheck className="h-3 w-3 text-brand-500" />
        ) : (
          <Check className="h-3 w-3 text-muted-foreground" />
        )}
      </div>

      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-soft',
          isOwn
            ? 'bg-brand-600 text-white rounded-br-md'
            : 'bg-card border border-border rounded-bl-md'
        )}
      >
        {message.raw_content && <p>{message.raw_content}</p>}
        {message.translated_text && message.translated_text !== message.raw_content && (
          <p className={cn('mt-1 text-xs', isOwn ? 'text-brand-100' : 'text-muted-foreground')}>
            Translated: {message.translated_text}
          </p>
        )}
      </div>

      {onSpeak && message.translated_text && (
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            'h-8 gap-1.5 text-xs',
            speaking ? 'text-brand-600 bg-brand-50 dark:bg-brand-900/30' : 'text-muted-foreground'
          )}
          onClick={() => onSpeak(message.translated_text!)}
        >
          <Volume2 className={cn('h-3.5 w-3.5', speaking && 'animate-pulse')} />
          {speaking ? 'Speaking...' : 'Speak'}
        </Button>
      )}
    </motion.div>
  );
}
