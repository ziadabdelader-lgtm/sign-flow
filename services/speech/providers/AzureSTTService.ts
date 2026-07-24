import type { ISpeechToTextService } from '../ISpeechToTextService';
import type { SpeechToTextResult, SpeechConfig } from '@/types/speech';

export class AzureSTTService implements ISpeechToTextService {
  readonly providerName = 'azure';

  async recognize(_audio: Blob, _config?: SpeechConfig): Promise<SpeechToTextResult> {
    // TODO: Implement when AZURE_SPEECH_KEY + AZURE_SPEECH_REGION are configured.
    //  Use Azure Speech SDK REST API: https://<region>.api.cognitive.microsoft.com/speechtotext/v3.1
    throw new Error('AzureSTTService: API key not configured. Set AZURE_SPEECH_KEY and AZURE_SPEECH_REGION in .env.local');
  }
}
