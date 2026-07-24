export interface SpeechToTextResult {
  text: string;
  language: string;
  confidence: number;
  durationMs: number;
}

export interface TextToSpeechResult {
  audioUrl: string;
  durationMs: number;
  provider: string;
  voiceId: string;
}

export interface SpeechConfig {
  language: string;
  voiceId?: string;
  sampleRate?: number;
}
