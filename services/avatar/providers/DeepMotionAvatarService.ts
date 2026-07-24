import type { IAvatarService } from '../IAvatarService';
import type { SignData, AvatarStatus, AvatarConfig } from '@/types/avatar';

export class DeepMotionAvatarService implements IAvatarService {
  readonly providerName = 'deepmotion';
  private status: AvatarStatus = 'idle';

  getStatus(): AvatarStatus {
    return this.status;
  }

  setStatus(status: AvatarStatus): void {
    this.status = status;
  }

  async animateAvatar(_text: string, _config?: AvatarConfig): Promise<SignData> {
    // TODO: Implement DeepMotion animation.
    //  POST text/script to DeepMotion API to generate body animation
    //  Requires DEEPMOTION_API_KEY in .env.local
    this.setStatus('signing');
    this.setStatus('idle');
    return { text: _text, gloss: [], timestamps: [], duration: 0 };
  }
}
