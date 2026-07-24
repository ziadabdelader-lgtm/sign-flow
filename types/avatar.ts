export type AvatarStatus = 'idle' | 'thinking' | 'signing' | 'loading' | 'error';

export interface AvatarSession {
  id: string;
  conversation_id: string | null;
  user_id: string;
  provider: string;
  status: AvatarStatus;
  sign_data: SignData | null;
  created_at: string;
}

export interface SignData {
  text: string;
  gloss: string[];
  timestamps: number[];
  duration: number;
}

export interface AvatarConfig {
  provider: string;
  modelUrl?: string;
  animationSet?: string;
  idleAnimation: boolean;
}
