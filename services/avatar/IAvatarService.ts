import type { SignData, AvatarStatus, AvatarConfig } from '@/types/avatar';

export interface IAvatarService {
  /** Generate sign-language animation data for the avatar from text. */
  animateAvatar(text: string, config?: AvatarConfig): Promise<SignData>;
  /** Current status of the avatar session. */
  getStatus(): AvatarStatus;
  /** Update avatar status (idle, thinking, signing, etc.). */
  setStatus(status: AvatarStatus): void;
  /** Provider name for logging and UI display. */
  readonly providerName: string;
}
