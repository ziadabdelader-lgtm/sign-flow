'use client';

import { useTranslation } from 'react-i18next';
import { MessageList } from '@/components/conversation/MessageList';
import { MessageInput } from '@/components/conversation/MessageInput';
import { MicrophoneRecorder } from '@/components/conversation/MicrophoneRecorder';
import { Card } from '@/components/ui/card';
import { Mic } from 'lucide-react';
import type { Message } from '@/types/message';
import { useConversationStore } from '@/store/conversationStore';

interface HearingUserPanelProps {
  messages: Message[];
  currentUserId: string;
  onSendText: (text: string) => void;
  onTranscribed: (text: string) => void;
}

export function HearingUserPanel({
  messages,
  currentUserId,
  onSendText,
  onTranscribed,
}: HearingUserPanelProps) {
  const { t } = useTranslation();
  const speakingMessageId = useConversationStore((s) => s.speakingMessageId);

  return (
    <Card className="flex h-full flex-col overflow-hidden border-brand-200 dark:border-brand-800/50">
      <div className="flex items-center gap-2 border-b border-border bg-brand-50/50 dark:bg-brand-950/20 px-4 py-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
          <Mic className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold">{t('aroundPeople')}</p>
          <p className="text-xs text-muted-foreground">{t('voiceTextInput')}</p>
        </div>
      </div>

      <MessageList
        messages={messages.filter((m) => m.sender_type === 'hearing')}
        currentUserId={currentUserId}
      />

      <div className="border-t border-border p-3 space-y-3">
        <MicrophoneRecorder onTranscribed={onTranscribed} />
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">{t('orType')}</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <MessageInput onSend={onSendText} placeholder={t('typeYourReply')} />
      </div>
    </Card>
  );
}
