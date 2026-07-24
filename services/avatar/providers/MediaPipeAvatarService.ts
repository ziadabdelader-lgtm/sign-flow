import type { IAvatarService } from '../IAvatarService';
import type { SignData, AvatarStatus, AvatarConfig } from '@/types/avatar';

export class MediaPipeAvatarService implements IAvatarService {
  readonly providerName = 'mediapipe';
  private status: AvatarStatus = 'idle';

  getStatus(): AvatarStatus {
    return this.status;
  }

  setStatus(status: AvatarStatus): void {
    this.status = status;
  }

  async animateAvatar(text: string, _config?: AvatarConfig): Promise<SignData> {
    // TODO: Implement MediaPipe-driven avatar animation.
    //  1. Parse text into sign language glosses (ASL/ISL)
    //  2. Map glosses to hand pose keyframes
    //  3. Drive a rigged 3D model's armature with the poses
    //  4. Return SignData with timeline for the R3F scene to consume
    this.setStatus('signing');
    const gloss = text.toLowerCase().split(/\s+/);
    const timestamps = gloss.map((_, i) => i * 0.6);
    void _config;
    this.setStatus('idle');
    return {
      text,
      gloss,
      timestamps,
      duration: timestamps.length * 0.6,
    };
  }
}
