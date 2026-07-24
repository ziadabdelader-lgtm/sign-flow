export interface TranslationResult {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  provider: string;
  model?: string;
  tokensUsed?: number;
  latencyMs?: number;
}

export interface TranslationConfig {
  sourceLanguage: string;
  targetLanguage: string;
  provider: string;
}
