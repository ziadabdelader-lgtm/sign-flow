'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hand, Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MessageList } from '@/components/conversation/MessageList';
import { MessageInput } from '@/components/conversation/MessageInput';
import { CameraRecorder } from '@/components/conversation/CameraRecorder';
import { SpeakButton } from '@/components/conversation/SpeakButton';
import type { Message } from '@/types/message';
import { useConversationStore } from '@/store/conversationStore';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { Card } from '@/components/ui/card';

interface DeafUserPanelProps {
  messages: Message[];
  currentUserId: string;
  onSendText: (text: string) => void;
  onRecognized: (text: string) => void;
  latestTranslatedText: string | null;
}

export function DeafUserPanel({
  messages,
  currentUserId,
  onSendText,
  onRecognized,
  latestTranslatedText,
}: DeafUserPanelProps) {
  const { t } = useTranslation();
  const [lastSpokenText, setLastSpokenText] = useState<string | null>(latestTranslatedText);
  const { isSpeaking, speak } = useSpeechSynthesis();
  const speakingMessageId = useConversationStore((s) => s.speakingMessageId);

  function handleSpeak(text: string, messageId: string) {
    useConversationStore.getState().setSpeakingMessageId(messageId);
    speak(text, () => useConversationStore.getState().setSpeakingMessageId(null));
    setLastSpokenText(text);
  }

  return (
    <Card className="flex h-full flex-col overflow-hidden border-brand-200 dark:border-brand-800/50">
      <div className="flex items-center gap-2 border-b border-border bg-brand-50/50 dark:bg-brand-950/20 px-4 py-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
          <Hand className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold">{t('you')}</p>
          <p className="text-xs text-muted-foreground">{t('signLanguageTextInput')}</p>
        </div>
      </div>

      <MessageList
        messages={messages.filter((m) => m.sender_type === 'deaf' || m.input_type === 'voice' || m.input_type === 'text')}
        currentUserId={currentUserId}
        onSpeak={handleSpeak}
        speakingMessageId={speakingMessageId}
      />

      <div className="border-t border-border p-3 space-y-3">
        <CameraRecorder onRecognized={onRecognized} />
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">{t('orType')}</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <MessageInput onSend={onSendText} placeholder={t('typeYourMessage')} />
      </div>
    </Card>
  );
}
