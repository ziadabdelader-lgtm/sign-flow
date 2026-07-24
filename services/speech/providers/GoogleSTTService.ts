import type { ISpeechToTextService } from '../ISpeechToTextService';
import type { SpeechToTextResult, SpeechConfig } from '@/types/speech';

export class GoogleSTTService implements ISpeechToTextService {
  readonly providerName = 'google';

  async recognize(_audio: Blob, _config?: SpeechConfig): Promise<SpeechToTextResult> {
    // TODO: Implement when GOOGLE_SPEECH_API_KEY is configured.
    //  POST audio to https://speech.googleapis.com/v1/speech:recognize
    throw new Error('GoogleSTTService: API key not configured. Set GOOGLE_SPEECH_API_KEY in .env.local');
  }
}
