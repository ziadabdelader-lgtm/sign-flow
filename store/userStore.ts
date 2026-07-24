import { create } from 'zustand';
import type { Profile } from '@/types/user';
import type { Subscription } from '@/types/subscription';
import type { UserSettings } from '@/types/settings';

interface UserState {
  profile: Profile | null;
  subscription: Subscription | null;
  settings: UserSettings | null;
  setProfile: (profile: Profile | null) => void;
  setSubscription: (sub: Subscription | null) => void;
  setSettings: (settings: UserSettings | null) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  subscription: null,
  settings: null,
  setProfile: (profile) => set({ profile }),
  setSubscription: (subscription) => set({ subscription }),
  setSettings: (settings) => set({ settings }),
  reset: () => set({ profile: null, subscription: null, settings: null }),
}));
