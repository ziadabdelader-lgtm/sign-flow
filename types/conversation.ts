export type ConversationStatus = 'active' | 'archived' | 'ended';

export interface Conversation {
  id: string;
  title: string | null;
  deaf_user_id: string | null;
  hearing_user_id: string | null;
  owner_id: string;
  status: ConversationStatus;
  created_at: string;
  updated_at: string;
  messages?: import('./message').Message[];
}

export interface CreateConversationInput {
  title?: string;
  deaf_user_id?: string;
  hearing_user_id?: string;
}
