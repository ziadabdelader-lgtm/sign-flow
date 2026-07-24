import type { ISpeechToTextService } from '../ISpeechToTextService';
import type { SpeechToTextResult, SpeechConfig } from '@/types/speech';
import { openaiConfig } from '@/lib/ai/openai';

export class WhisperSTTService implements ISpeechToTextService {
  readonly providerName = 'whisper';

  async recognize(audio: Blob, _config?: SpeechConfig): Promise<SpeechToTextResult> {
    // TODO: Implement when OPENAI_API_KEY is configured.
    //  const form = new FormData();
    //  form.append('file', audio, 'recording.webm');
    //  form.append('model', openaiConfig.whisperModel);
    //  const res = await fetch(`${openaiConfig.baseUrl}/audio/transcriptions`, {
    //    method: 'POST',
    //    headers: { Authorization: `Bearer ${openaiConfig.apiKey}` },
    //    body: form,
    //  });
    //  const data = await res.json();
    //  return { text: data.text, language: data.language ?? 'en', confidence: 0.95, durationMs: data.duration * 1000 };
    void audio; void openaiConfig;
    throw new Error('WhisperSTTService: API key not configured. Set OPENAI_API_KEY in .env.local');
  }
}
