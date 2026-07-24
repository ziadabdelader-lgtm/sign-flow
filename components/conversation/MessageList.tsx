'use client';

import { useEffect, useRef } from 'react';
import type { Message } from '@/types/message';
import { MessageBubble } from '@/components/conversation/MessageBubble';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  onSpeak?: (text: string, messageId: string) => void;
  speakingMessageId?: string | null;
}

export function MessageList({ messages, currentUserId, onSpeak, speakingMessageId }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-center">
        <div className="max-w-sm">
          <p className="text-sm text-muted-foreground">
            No messages yet. Start the conversation by typing a message or using the camera / microphone.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 space-y-4 overflow-y-auto p-4"
      role="log"
      aria-live="polite"
      aria-label="Conversation messages"
    >
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isOwn={message.sender_id === currentUserId}
          onSpeak={onSpeak ? (text) => onSpeak(text, message.id) : undefined}
          speaking={speakingMessageId === message.id}
        />
      ))}
      <div ref={endRef} />
    </div>
  );
}
