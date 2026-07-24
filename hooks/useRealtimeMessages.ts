'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useConversationStore } from '@/store/conversationStore';
import type { Message } from '@/types/message';

export function useRealtimeMessages(conversationId: string | null) {
  const supabase = createClient();
  const setMessages = useConversationStore((s) => s.setMessages);
  const addMessage = useConversationStore((s) => s.addMessage);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!conversationId) return;

    (async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      if (error) {
        setError(error.message);
        return;
      }
      setMessages((data as Message[]) || []);
    })();

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          addMessage(payload.new as Message);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, supabase, setMessages, addMessage]);

  return { error };
}
