import type { ITextToSpeechService } from '../ITextToSpeechService';
import type { TextToSpeechResult, SpeechConfig } from '@/types/speech';

export class GoogleTTSService implements ITextToSpeechService {
  readonly providerName = 'google';

  async synthesize(_text: string, _config?: SpeechConfig): Promise<TextToSpeechResult> {
    // TODO: Implement when GOOGLE_APPLICATION_CREDENTIALS or GOOGLE_SPEECH_API_KEY is configured.
    //  Use Google Cloud Text-to-Speech API: https://texttospeech.googleapis.com/v1/text:synthesize
    throw new Error('GoogleTTSService: API key not configured. Set GOOGLE_SPEECH_API_KEY in .env.local');
  }
}
