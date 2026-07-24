import type { ITranslationService } from '../ITranslationService';
import type { TranslationResult, TranslationConfig } from '@/types/translation';
import { openaiConfig } from '@/lib/ai/openai';

export class OpenAITranslationService implements ITranslationService {
  readonly providerName = 'openai';

  async translate(text: string, config: TranslationConfig): Promise<TranslationResult> {
    // TODO: Implement when OPENAI_API_KEY is configured.
    //  const prompt = `Translate the following text from ${config.sourceLanguage} to ${config.targetLanguage}. Return only the translation.\n\n${text}`;
    //  const res = await fetch(`${openaiConfig.baseUrl}/chat/completions`, {
    //    method: 'POST',
    //    headers: { Authorization: `Bearer ${openaiConfig.apiKey}`, 'Content-Type': 'application/json' },
    //    body: JSON.stringify({ model: openaiConfig.defaultModel, messages: [{ role: 'user', content: prompt }], temperature: 0.3 }),
    //  });
    //  const data = await res.json();
    //  return { translatedText: data.choices[0].message.content, ...config, provider: 'openai', model: openaiConfig.defaultModel };
    void text; void config; void openaiConfig;
    throw new Error('OpenAITranslationService: API key not configured. Set OPENAI_API_KEY in .env.local');
  }
}
