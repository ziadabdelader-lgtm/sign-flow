import type { ISignRecognitionService } from '../ISignRecognitionService';
import type { SignData } from '@/types/avatar';

export class OpenCVRecognitionService implements ISignRecognitionService {
  readonly providerName = 'opencv';

  async recognize(_video: Blob): Promise<{ text: string; signData: SignData }> {
    // TODO: Implement OpenCV.js-based skin segmentation + contour matching.
    //  This is a classical CV approach — typically used as a baseline.
    throw new Error('OpenCVRecognitionService: not yet implemented. Requires OpenCV.js + trained contour templates.');
  }
}
