'use client';

import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { cn } from '@/lib/utils';

interface SpeakButtonProps {
  text: string | null;
  className?: string;
}

export function SpeakButton({ text, className }: SpeakButtonProps) {
  const { isSpeaking, speak, cancel } = useSpeechSynthesis();

  function handleClick() {
    if (!text) return;
    if (isSpeaking) {
      cancel();
    } else {
      speak(text);
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={!text}
      className={cn(
        'w-full h-14 gap-2 font-semibold text-base transition-all',
        isSpeaking
          ? 'bg-brand-500 hover:bg-brand-400 shadow-glow-lg'
          : 'bg-brand-600 hover:bg-brand-700 shadow-soft',
        !text && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-label={isSpeaking ? 'Stop speaking' : 'Speak the translated text'}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="h-6 w-6" />
          Stop Speaking
        </>
      ) : (
        <>
          <Volume2 className="h-6 w-6" />
          Speak
        </>
      )}
      {isSpeaking && (
        <span className="ml-1 flex items-end gap-0.5 h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1 bg-white rounded-full animate-wave"
              style={{ animationDelay: `${i * 0.15}s`, height: '100%' }}
            />
          ))}
        </span>
      )}
    </Button>
  );
}
