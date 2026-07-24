import type { ISpeechToTextService } from '../ISpeechToTextService';
import type { SpeechToTextResult, SpeechConfig } from '@/types/speech';

export class DeepgramSTTService implements ISpeechToTextService {
  readonly providerName = 'deepgram';

  async recognize(_audio: Blob, _config?: SpeechConfig): Promise<SpeechToTextResult> {
    // TODO: Implement when DEEPGRAM_API_KEY is configured.
    //  POST audio to https://api.deepgram.com/v1/listen
    throw new Error('DeepgramSTTService: API key not configured. Set DEEPGRAM_API_KEY in .env.local');
  }
}
