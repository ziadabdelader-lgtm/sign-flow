'use client';

import { Pause, Play, RotateCcw, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAvatarStore } from '@/store/avatarStore';

export function AvatarControls() {
  const status = useAvatarStore((s) => s.status);
  const setStatus = useAvatarStore((s) => s.setStatus);
  const setSignData = useAvatarStore((s) => s.setSignData);

  const isAnimating = status === 'signing';

  return (
    <div className="border-t border-border bg-card/50 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label={isAnimating ? 'Pause animation' : 'Play animation'}
          className="h-10 w-10"
          onClick={() => setStatus(isAnimating ? 'idle' : 'signing')}
        >
          {isAnimating ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button
          variant="ghost"
          size="icon"
          aria-label="Reset avatar"
          className="h-10 w-10"
          onClick={() => {
            setStatus('idle');
            setSignData(null);
          }}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Fullscreen avatar"
          className="h-10 w-10"
        >
          <Maximize2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
