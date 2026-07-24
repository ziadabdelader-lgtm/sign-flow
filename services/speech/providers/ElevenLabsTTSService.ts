import type { ITextToSpeechService } from '../ITextToSpeechService';
import type { TextToSpeechResult, SpeechConfig } from '@/types/speech';
import { elevenlabsConfig } from '@/lib/ai/elevenlabs';

export class ElevenLabsTTSService implements ITextToSpeechService {
  readonly providerName = 'elevenlabs';

  async synthesize(text: string, config?: SpeechConfig): Promise<TextToSpeechResult> {
    // TODO: Implement when ELEVENLABS_API_KEY is configured.
    //  const voiceId = config?.voiceId || elevenlabsConfig.defaultVoiceId;
    //  const res = await fetch(`${elevenlabsConfig.baseUrl}/text-to-speech/${voiceId}`, {
    //    method: 'POST',
    //    headers: { 'xi-api-key': elevenlabsConfig.apiKey, 'Content-Type': 'application/json' },
    //    body: JSON.stringify({ text, voice_settings: { stability: 0.5, similarity_boost: 0.75 } }),
    //  });
    //  const blob = await res.blob();
    //  const audioUrl = URL.createObjectURL(blob);
    //  return { audioUrl, durationMs: 0, provider: 'elevenlabs', voiceId };
    void text; void config; void elevenlabsConfig;
    throw new Error('ElevenLabsTTSService: API key not configured. Set ELEVENLABS_API_KEY in .env.local');
  }
}
