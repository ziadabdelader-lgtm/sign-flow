import type { ISignRecognitionService } from '../ISignRecognitionService';
import type { SignData } from '@/types/avatar';
import { mediapipeConfig } from '@/lib/ai/mediapipe';

export class MediaPipeRecognitionService implements ISignRecognitionService {
  readonly providerName = 'mediapipe';

  async recognize(video: Blob): Promise<{ text: string; signData: SignData }> {
    // TODO: Implement MediaPipe Holistic pipeline.
    //  1. Extract frames from the video Blob
    //  2. Load MediaPipe Holistic model (hands + pose + face)
    //  3. For each frame, detect hand landmarks and pose
    //  4. Aggregate landmark sequence into a gesture vector
    //  5. Map gesture sequence to sign language glosses
    //  6. Translate glosses into natural language text
    //  mediapipeConfig provides CDN URLs for model loading
    void video; void mediapipeConfig;
    throw new Error('MediaPipeRecognitionService: not yet implemented. Sign recognition model pending training data.');
  }
}
