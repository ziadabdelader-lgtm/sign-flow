'use client';

import { useState } from 'react';
import type { SignData } from '@/types/avatar';

export function useSignRecognition() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ text: string; signData: SignData } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function recognize(video: Blob): Promise<{ text: string; signData: SignData } | null> {
    setIsProcessing(true);
    setError(null);
    try {
      const res = await fetch('/api/signs/recognize', {
        method: 'POST',
        body: video,
      });
      if (!res.ok) throw new Error('Sign recognition failed');
      const data = await res.json();
      setResult(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }

  return { isProcessing, result, error, recognize };
}
