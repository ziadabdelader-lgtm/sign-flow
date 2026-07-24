import type { SignData } from '@/types/avatar';

export interface ISignRecognitionService {
  /** Recognize sign language from a video recording and return translated text. */
  recognize(video: Blob): Promise<{ text: string; signData: SignData }>;
  /** Provider name for logging and UI display. */
  readonly providerName: string;
}
