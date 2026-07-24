import type { IAvatarService } from '../IAvatarService';
import type { SignData, AvatarStatus, AvatarConfig } from '@/types/avatar';

export class ReadyPlayerMeAvatarService implements IAvatarService {
  readonly providerName = 'readyplayerme';
  private status: AvatarStatus = 'idle';

  getStatus(): AvatarStatus {
    return this.status;
  }

  setStatus(status: AvatarStatus): void {
    this.status = status;
  }

  async animateAvatar(_text: string, _config?: AvatarConfig): Promise<SignData> {
    // TODO: Implement Ready Player Me avatar animation.
    //  1. Load RPM .glb model via GLTFLoader (R3F Drei)
    //  2. Apply sign-language animation clips from DeepMotion or custom clip
    //  3. Blend idle + signing animations
    //  Requires READY_PLAYER_ME_SUBDOMAIN in .env.local
    this.setStatus('signing');
    this.setStatus('idle');
    return { text: _text, gloss: [], timestamps: [], duration: 0 };
  }
}
