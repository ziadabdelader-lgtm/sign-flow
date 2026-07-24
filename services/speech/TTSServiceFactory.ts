import { AI_CONFIG, type TTSProvider } from '@/config/ai.config';
import type { ITextToSpeechService } from './ITextToSpeechService';
import { ElevenLabsTTSService } from './providers/ElevenLabsTTSService';
import { AzureTTSService } from './providers/AzureTTSService';
import { GoogleTTSService } from './providers/GoogleTTSService';

export class TTSServiceFactory {
  static create(provider?: TTSProvider): ITextToSpeechService {
    const name = provider || AI_CONFIG.tts.provider;

    switch (name) {
      case 'elevenlabs':
        return new ElevenLabsTTSService();
      case 'azure':
        return new AzureTTSService();
      case 'google':
        return new GoogleTTSService();
      default:
        throw new Error(`Unknown TTS provider: ${name}`);
    }
  }
}
