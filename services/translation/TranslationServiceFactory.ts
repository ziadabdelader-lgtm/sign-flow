import { AI_CONFIG, type TranslationProvider } from '@/config/ai.config';
import type { ITranslationService } from './ITranslationService';
import { OpenAITranslationService } from './providers/OpenAITranslationService';
import { ClaudeTranslationService } from './providers/ClaudeTranslationService';
import { GeminiTranslationService } from './providers/GeminiTranslationService';

export class TranslationServiceFactory {
  static create(provider?: TranslationProvider): ITranslationService {
    const name = provider || AI_CONFIG.translation.provider;

    switch (name) {
      case 'openai':
        return new OpenAITranslationService();
      case 'claude':
        return new ClaudeTranslationService();
      case 'gemini':
        return new GeminiTranslationService();
      default:
        throw new Error(`Unknown translation provider: ${name}`);
    }
  }
}
