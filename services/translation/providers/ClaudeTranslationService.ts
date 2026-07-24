import type { ITranslationService } from '../ITranslationService';
import type { TranslationResult, TranslationConfig } from '@/types/translation';

export class ClaudeTranslationService implements ITranslationService {
  readonly providerName = 'claude';

  async translate(_text: string, _config: TranslationConfig): Promise<TranslationResult> {
    // TODO: Implement when ANTHROPIC_API_KEY is configured.
    //  POST to https://api.anthropic.com/v1/messages
    //  model: claude-3-5-sonnet-20241022
    throw new Error('ClaudeTranslationService: API key not configured. Set ANTHROPIC_API_KEY in .env.local');
  }
}
