import type { TextToSpeechResult, SpeechConfig } from '@/types/speech';

export interface ITextToSpeechService {
  /** Synthesize natural-sounding speech from text. */
  synthesize(text: string, config?: SpeechConfig): Promise<TextToSpeechResult>;
  /** Provider name for logging and UI display. */
  readonly providerName: string;
}
