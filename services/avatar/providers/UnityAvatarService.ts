import type { IAvatarService } from '../IAvatarService';
import type { SignData, AvatarStatus, AvatarConfig } from '@/types/avatar';

export class UnityAvatarService implements IAvatarService {
  readonly providerName = 'unity';
  private status: AvatarStatus = 'idle';

  getStatus(): AvatarStatus {
    return this.status;
  }

  setStatus(status: AvatarStatus): void {
    this.status = status;
  }

  async animateAvatar(_text: string, _config?: AvatarConfig): Promise<SignData> {
    // TODO: Implement Unity-based avatar via WebGL build + postMessage bridge.
    //  The Unity WebGL build would run in an iframe and receive sign commands.
    this.setStatus('signing');
    this.setStatus('idle');
    return { text: _text, gloss: [], timestamps: [], duration: 0 };
  }
}
