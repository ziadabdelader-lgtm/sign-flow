'use client';

import { Video, Square, Loader2, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCameraRecorder } from '@/hooks/useCameraRecorder';
import { useSignRecognition } from '@/hooks/useSignRecognition';
import { cn } from '@/lib/utils';

interface CameraRecorderProps {
  onRecognized: (text: string) => void;
}

export function CameraRecorder({ onRecognized }: CameraRecorderProps) {
  const { isRecording, startRecording, stopRecording, videoBlob, stream } = useCameraRecorder();
  const { isProcessing, recognize } = useSignRecognition();

  async function handleStop() {
    stopRecording();
    if (videoBlob) {
      const result = await recognize(videoBlob);
      if (result) {
        onRecognized(result.text);
      }
    }
  }

  return (
    <div className="space-y-3">
      {stream && isRecording && (
        <div className="relative rounded-xl overflow-hidden border border-border bg-black aspect-video">
          <video
            autoPlay
            muted
            playsInline
            ref={(el) => {
              if (el && stream) el.srcObject = stream;
            }}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-destructive px-3 py-1 text-xs font-medium text-white">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            Recording
          </div>
        </div>
      )}

      <Button
        onClick={isRecording ? handleStop : startRecording}
        disabled={isProcessing}
        className={cn(
          'w-full h-12 gap-2 font-medium transition-all',
          isRecording
            ? 'bg-destructive hover:bg-destructive/90 animate-pulse'
            : 'bg-brand-600 hover:bg-brand-700'
        )}
        aria-label={isRecording ? 'Stop recording sign language' : 'Start recording sign language'}
      >
        {isProcessing ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> Recognizing signs...</>
        ) : isRecording ? (
          <><Square className="h-5 w-5 fill-current" /> Stop & Send</>
        ) : (
          <><Camera className="h-5 w-5" /> Record Sign Language</>
        )}
      </Button>
    </div>
  );
}
