'use client';

import { createClient } from '@/lib/supabase/client';
import type { Conversation } from '@/types/conversation';
import type { Message, CreateMessageInput } from '@/types/message';

export function useConversation() {
  const supabase = createClient();

  async function createConversation(title?: string): Promise<Conversation | null> {
    const { data, error } = await supabase
      .from('conversations')
      .insert({ title })
      .select()
      .maybeSingle();
    if (error) return null;
    return data as Conversation;
  }

  async function getConversations(): Promise<Conversation[]> {
    const { data } = await supabase
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false });
    return (data as Conversation[]) || [];
  }

  async function getConversation(id: string): Promise<Conversation | null> {
    const { data } = await supabase
      .from('conversations')
      .select('*, messages(*)')
      .eq('id', id)
      .maybeSingle();
    return data as Conversation;
  }

  async function sendMessage(input: CreateMessageInput): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .insert(input)
      .select()
      .maybeSingle();
    if (error) return null;
    return data as Message;
  }

  async function deleteConversation(id: string): Promise<boolean> {
    const { error } = await supabase.from('conversations').delete().eq('id', id);
    return !error;
  }

  return {
    createConversation,
    getConversations,
    getConversation,
    sendMessage,
    deleteConversation,
  };
}
