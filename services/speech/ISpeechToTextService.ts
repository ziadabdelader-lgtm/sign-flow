import type { SpeechToTextResult, SpeechConfig } from '@/types/speech';

export interface ISpeechToTextService {
  /** Transcribe an audio buffer into text. */
  recognize(audio: Blob, config?: SpeechConfig): Promise<SpeechToTextResult>;
  /** Provider name for logging and UI display. */
  readonly providerName: string;
}
