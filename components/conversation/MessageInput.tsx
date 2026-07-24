'use client';

import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MessageInputProps {
  onSend: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MessageInput({ onSend, placeholder = 'Type a message...', disabled }: MessageInputProps) {
  const [text, setText] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-3">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1"
        aria-label="Message input"
      />
      <Button
        type="submit"
        size="icon"
        disabled={disabled || !text.trim()}
        aria-label="Send message"
        className="h-11 w-11 bg-brand-600 hover:bg-brand-700"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
}
