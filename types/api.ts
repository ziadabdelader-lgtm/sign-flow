export interface ApiError {
  error: string;
  code?: string;
  details?: unknown;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

export type ProviderName =
  | 'whisper'
  | 'google'
  | 'azure'
  | 'deepgram'
  | 'assemblyai'
  | 'elevenlabs'
  | 'openai'
  | 'claude'
  | 'gemini'
  | 'mediapipe'
  | 'tensorflow'
  | 'opencv'
  | 'pytorch'
  | 'readyplayerme'
  | 'deepmotion'
  | 'nvidia-ace'
  | 'unity';
