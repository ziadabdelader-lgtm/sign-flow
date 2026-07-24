import type { ITranslationService } from '../ITranslationService';
import type { TranslationResult, TranslationConfig } from '@/types/translation';

export class GeminiTranslationService implements ITranslationService {
  readonly providerName = 'gemini';

  async translate(_text: string, _config: TranslationConfig): Promise<TranslationResult> {
    // TODO: Implement when GEMINI_API_KEY is configured.
    //  POST to https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
    throw new Error('GeminiTranslationService: API key not configured. Set GEMINI_API_KEY in .env.local');
  }
}
