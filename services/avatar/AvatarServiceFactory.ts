import { AI_CONFIG, type AvatarProvider } from '@/config/ai.config';
import type { IAvatarService } from './IAvatarService';
import { MediaPipeAvatarService } from './providers/MediaPipeAvatarService';
import { ReadyPlayerMeAvatarService } from './providers/ReadyPlayerMeAvatarService';
import { DeepMotionAvatarService } from './providers/DeepMotionAvatarService';
import { NvidiaACEAvatarService } from './providers/NvidiaACEAvatarService';
import { UnityAvatarService } from './providers/UnityAvatarService';

export class AvatarServiceFactory {
  static create(provider?: AvatarProvider): IAvatarService {
    const name = provider || AI_CONFIG.avatar.provider;

    switch (name) {
      case 'mediapipe':
        return new MediaPipeAvatarService();
      case 'readyplayerme':
        return new ReadyPlayerMeAvatarService();
      case 'deepmotion':
        return new DeepMotionAvatarService();
      case 'nvidia-ace':
        return new NvidiaACEAvatarService();
      case 'unity':
        return new UnityAvatarService();
      default:
        throw new Error(`Unknown avatar provider: ${name}`);
    }
  }
}
