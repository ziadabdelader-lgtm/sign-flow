import { create } from 'zustand';
import type { AvatarStatus, SignData } from '@/types/avatar';

interface AvatarState {
  status: AvatarStatus;
  currentSignData: SignData | null;
  provider: string;
  isLoaded: boolean;
  setStatus: (status: AvatarStatus) => void;
  setSignData: (data: SignData | null) => void;
  setProvider: (provider: string) => void;
  setIsLoaded: (loaded: boolean) => void;
  reset: () => void;
}

export const useAvatarStore = create<AvatarState>((set) => ({
  status: 'idle',
  currentSignData: null,
  provider: 'mediapipe',
  isLoaded: false,
  setStatus: (status) => set({ status }),
  setSignData: (data) => set({ currentSignData: data }),
  setProvider: (provider) => set({ provider }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  reset: () => set({ status: 'idle', currentSignData: null, isLoaded: false }),
}));
