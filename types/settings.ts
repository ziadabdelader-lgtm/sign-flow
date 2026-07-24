export interface UserSettings {
  id: string;
  user_id: string;
  theme: 'light' | 'dark' | 'system';
  stt_provider: string;
  tts_provider: string;
  translation_provider: string;
  avatar_provider: string;
  voice_id: string | null;
  language: string;
  accessibility_mode: boolean;
  high_contrast: boolean;
  large_text: boolean;
  updated_at: string;
}

export interface UpdateSettingsInput {
  theme?: 'light' | 'dark' | 'system';
  stt_provider?: string;
  tts_provider?: string;
  translation_provider?: string;
  avatar_provider?: string;
  voice_id?: string;
  language?: string;
  accessibility_mode?: boolean;
  high_contrast?: boolean;
  large_text?: boolean;
}
