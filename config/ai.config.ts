export const AI_CONFIG = {
  stt: {
    provider: (process.env.STT_PROVIDER as string) || 'whisper',
    providers: ['whisper', 'google', 'azure', 'deepgram', 'assemblyai'] as const,
  },
  tts: {
    provider: (process.env.TTS_PROVIDER as string) || 'elevenlabs',
    providers: ['elevenlabs', 'azure', 'google'] as const,
  },
  translation: {
    provider: (process.env.TRANSLATION_PROVIDER as string) || 'openai',
    providers: ['openai', 'claude', 'gemini'] as const,
  },
  avatar: {
    provider: (process.env.AVATAR_PROVIDER as string) || 'mediapipe',
    providers: ['mediapipe', 'readyplayerme', 'deepmotion', 'nvidia-ace', 'unity'] as const,
  },
  recognition: {
    provider: (process.env.RECOGNITION_PROVIDER as string) || 'mediapipe',
    providers: ['mediapipe', 'tensorflow', 'opencv', 'pytorch'] as const,
  },
} as const;

export type STTProvider = typeof AI_CONFIG.stt.providers[number];
export type TTSProvider = typeof AI_CONFIG.tts.providers[number];
export type TranslationProvider = typeof AI_CONFIG.translation.providers[number];
export type AvatarProvider = typeof AI_CONFIG.avatar.providers[number];
export type RecognitionProvider = typeof AI_CONFIG.recognition.providers[number];
