import type { ISignRecognitionService } from '../ISignRecognitionService';
import type { SignData } from '@/types/avatar';

export class TensorFlowRecognitionService implements ISignRecognitionService {
  readonly providerName = 'tensorflow';

  async recognize(_video: Blob): Promise<{ text: string; signData: SignData }> {
    // TODO: Implement TensorFlow.js sign recognition model.
    //  Load a pre-trained gesture classification model (e.g., Sign Language MNIST or custom ISL model).
    //  Process video frames through the model to classify hand signs.
    throw new Error('TensorFlowRecognitionService: not yet implemented. Requires trained model weights.');
  }
}
