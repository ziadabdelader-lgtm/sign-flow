import type { ISpeechToTextService } from '../ISpeechToTextService';
import type { SpeechToTextResult, SpeechConfig } from '@/types/speech';

export class AssemblyAISTTService implements ISpeechToTextService {
  readonly providerName = 'assemblyai';

  async recognize(_audio: Blob, _config?: SpeechConfig): Promise<SpeechToTextResult> {
    // TODO: Implement when ASSEMBLYAI_API_KEY is configured.
    //  1. POST audio to https://api.assemblyai.com/v2/upload
    //  2. POST transcript request to https://api.assemblyai.com/v2/transcript
    //  3. Poll until status === 'completed'
    throw new Error('AssemblyAISTTService: API key not configured. Set ASSEMBLYAI_API_KEY in .env.local');
  }
}
