export type SenderType = 'deaf' | 'hearing';
export type InputType = 'text' | 'sign_video' | 'voice';
export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_type: SenderType;
  input_type: InputType;
  raw_content: string | null;
  translated_text: string | null;
  audio_url: string | null;
  video_url: string | null;
  status: MessageStatus;
  created_at: string;
}

export interface CreateMessageInput {
  conversation_id: string;
  sender_type: SenderType;
  input_type: InputType;
  raw_content?: string;
  translated_text?: string;
  audio_url?: string;
  video_url?: string;
}
