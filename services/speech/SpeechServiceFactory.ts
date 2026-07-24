import { AI_CONFIG, type STTProvider } from '@/config/ai.config';
import type { ISpeechToTextService } from './ISpeechToTextService';
import { WhisperSTTService } from './providers/WhisperSTTService';
import { GoogleSTTService } from './providers/GoogleSTTService';
import { AzureSTTService } from './providers/AzureSTTService';
import { DeepgramSTTService } from './providers/DeepgramSTTService';
import { AssemblyAISTTService } from './providers/AssemblyAISTTService';

export class SpeechServiceFactory {
  static create(provider?: STTProvider): ISpeechToTextService {
    const name = provider || AI_CONFIG.stt.provider;

    switch (name) {
      case 'whisper':
        return new WhisperSTTService();
      case 'google':
        return new GoogleSTTService();
      case 'azure':
        return new AzureSTTService();
      case 'deepgram':
        return new DeepgramSTTService();
      case 'assemblyai':
        return new AssemblyAISTTService();
      default:
        throw new Error(`Unknown STT provider: ${name}`);
    }
  }
}
