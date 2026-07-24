'use client';

import { useState } from 'react';
import { useAvatarStore } from '@/store/avatarStore';
import type { AvatarStatus } from '@/types/avatar';

export function useAvatarState() {
  const { status, currentSignData, isLoaded, setStatus, setSignData, setIsLoaded } =
    useAvatarStore();
  const [error, setError] = useState<string | null>(null);

  function startSigning() {
    setStatus('thinking');
    setError(null);
  }

  function finishSigning(signData: typeof currentSignData) {
    setSignData(signData);
    setStatus('signing');
  }

  function goIdle() {
    setStatus('idle');
    setSignData(null);
  }

  function fail(message: string) {
    setError(message);
    setStatus('error');
  }

  return {
    status: status as AvatarStatus,
    signData: currentSignData,
    isLoaded,
    error,
    startSigning,
    finishSigning,
    goIdle,
    fail,
    setStatus,
    setIsLoaded,
  };
}
