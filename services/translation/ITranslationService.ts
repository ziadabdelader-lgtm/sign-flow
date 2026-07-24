import type { TranslationResult, TranslationConfig } from '@/types/translation';

export interface ITranslationService {
  /** Translate source text into the target language. */
  translate(text: string, config: TranslationConfig): Promise<TranslationResult>;
  /** Provider name for logging and UI display. */
  readonly providerName: string;
}
