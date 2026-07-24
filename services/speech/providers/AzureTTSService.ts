import type { ITextToSpeechService } from '../ITextToSpeechService';
import type { TextToSpeechResult, SpeechConfig } from '@/types/speech';

export class AzureTTSService implements ITextToSpeechService {
  readonly providerName = 'azure';

  async synthesize(_text: string, _config?: SpeechConfig): Promise<TextToSpeechResult> {
    // TODO: Implement when AZURE_SPEECH_KEY + AZURE_SPEECH_REGION are configured.
    //  Use Azure Cognitive Services Speech REST API (neural voices).
    throw new Error('AzureTTSService: API key not configured. Set AZURE_SPEECH_KEY and AZURE_SPEECH_REGION in .env.local');
  }
}
