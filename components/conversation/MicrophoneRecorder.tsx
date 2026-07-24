'use client';

import { Mic, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { cn } from '@/lib/utils';

interface MicrophoneRecorderProps {
  onTranscribed: (text: string) => void;
}

export function MicrophoneRecorder({ onTranscribed }: MicrophoneRecorderProps) {
  const { isRecording, startRecording, stopRecording, audioBlob } = useAudioRecorder();

  async function handleStop() {
    stopRecording();
    if (audioBlob) {
      try {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');
        const res = await fetch('/api/speech/recognize', {
          method: 'POST',
          body: formData,
        });
        if (res.ok) {
          const data = await res.json();
          if (data.text) onTranscribed(data.text);
        }
      } catch {
        // Error is silent — user can type instead
      }
    }
  }

  return (
    <Button
      onClick={isRecording ? handleStop : startRecording}
      className={cn(
        'w-full h-12 gap-2 font-medium transition-all',
        isRecording
          ? 'bg-destructive hover:bg-destructive/90'
          : 'bg-brand-600 hover:bg-brand-700'
      )}
      aria-label={isRecording ? 'Stop recording voice' : 'Start recording voice'}
    >
      {isRecording ? (
        <>
          <div className="flex items-end gap-0.5 h-5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="w-1 bg-white rounded-full animate-wave"
                style={{ animationDelay: `${i * 0.1}s`, height: '100%' }}
              />
            ))}
          </div>
          Stop & Transcribe
        </>
      ) : (
        <><Mic className="h-5 w-5" /> Record Voice</>
      )}
    </Button>
  );
}
