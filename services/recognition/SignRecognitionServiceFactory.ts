import { AI_CONFIG, type RecognitionProvider } from '@/config/ai.config';
import type { ISignRecognitionService } from './ISignRecognitionService';
import { MediaPipeRecognitionService } from './providers/MediaPipeRecognitionService';
import { TensorFlowRecognitionService } from './providers/TensorFlowRecognitionService';
import { OpenCVRecognitionService } from './providers/OpenCVRecognitionService';

export class SignRecognitionServiceFactory {
  static create(provider?: RecognitionProvider): ISignRecognitionService {
    const name = provider || AI_CONFIG.recognition.provider;

    switch (name) {
      case 'mediapipe':
        return new MediaPipeRecognitionService();
      case 'tensorflow':
        return new TensorFlowRecognitionService();
      case 'opencv':
        return new OpenCVRecognitionService();
      default:
        throw new Error(`Unknown recognition provider: ${name}`);
    }
  }
}
