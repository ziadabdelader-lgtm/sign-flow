'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Hand, Mic, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeafUserPanel } from '@/components/conversation/DeafUserPanel';
import { HearingUserPanel } from '@/components/conversation/HearingUserPanel';
import { AvatarPanel } from '@/components/avatar/AvatarPanel';
import { LoadingScreen } from '@/components/shared/LoadingScreen';
import { createClient } from '@/lib/supabase/client';
import { useConversationStore } from '@/store/conversationStore';
import { useAvatarStore } from '@/store/avatarStore';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import type { Message } from '@/types/message';
import type { Conversation } from '@/types/conversation';

export default function ConversationScreen() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [latestTranslatedText, setLatestTranslatedText] = useState<string | null>(null);

  const { isSpeaking, speak } = useSpeechSynthesis();
  const setSpeakingMessageId = useConversationStore((s) => s.setSpeakingMessageId);
  const avatarStatus = useAvatarStore((s) => s.status);
  const setAvatarStatus = useAvatarStore((s) => s.setStatus);
  const setSignData = useAvatarStore((s) => s.setSignData);

  useEffect(() => {
    (async () => {
      try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          console.error('Auth error:', authError);
          alert('Authentication error. Please login again.');
          router.push('/login');
          return;
        }

        if (!user) {
          console.error('No user found');
          router.push('/login');
          return;
        }
        
        console.log('User authenticated:', user.id);
        setUserId(user.id);

        if (conversationId && conversationId !== 'new') {
          console.log('Loading existing conversation:', conversationId);
          const { data: conv, error: convError } = await supabase
            .from('conversations')
            .select('*, messages(*)')
            .eq('id', conversationId)
            .maybeSingle();
          
          if (convError) {
            console.error('Error loading conversation:', convError);
            alert(`Error loading conversation: ${convError.message}\n\nPlease check DATABASE_SETUP.md`);
            setLoading(false);
            return;
          }

          if (conv) {
            console.log('Conversation loaded:', conv);
            setConversation(conv as Conversation);
            setMessages((conv.messages as Message[]) || []);
          } else {
            console.log('Conversation not found');
            alert('Conversation not found. Creating a new one...');
            router.replace('/conversation/new');
            return;
          }
        } else {
          console.log('Creating new conversation for user:', user.id);
          const { data: newConv, error: createError } = await supabase
            .from('conversations')
            .insert({ title: 'New Conversation', owner_id: user.id })
            .select()
            .maybeSingle();
          
          if (createError) {
            console.error('Error creating conversation:', createError);
            alert(`Error creating conversation: ${createError.message}\n\nThe 'conversations' table may not exist. Please check DATABASE_SETUP.md to set up your database.`);
            setLoading(false);
            return;
          }

          if (newConv) {
            console.log('New conversation created:', newConv);
            setConversation(newConv as Conversation);
            router.replace(`/conversation/${newConv.id}`);
          } else {
            console.error('Failed to create conversation - no data returned');
            alert('Failed to create conversation. Please check DATABASE_SETUP.md');
            setLoading(false);
            return;
          }
        }
        setLoading(false);
      } catch (err) {
        console.error('Unexpected error in useEffect:', err);
        alert(`Unexpected error: ${err}\n\nPlease check the console and DATABASE_SETUP.md`);
        setLoading(false);
      }
    })();
  }, [conversationId, router]);

  const sendMessage = useCallback(
    async (text: string, senderType: 'deaf' | 'hearing', inputType: 'text' | 'sign_video' | 'voice') => {
      if (!conversation?.id) {
        console.error('No conversation ID available');
        alert('Error: No conversation found. Please try refreshing the page.');
        return;
      }

      if (!userId) {
        console.error('No user ID available');
        alert('Error: Not authenticated. Please login again.');
        return;
      }

      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('messages')
          .insert({
            conversation_id: conversation.id,
            sender_id: userId,
            sender_type: senderType,
            input_type: inputType,
            raw_content: text,
            translated_text: text,
          })
          .select()
          .maybeSingle();

        if (error) {
          console.error('Supabase error:', error);
          alert(`Database error: ${error.message}\n\nPlease check DATABASE_SETUP.md to set up your database.`);
          return;
        }

        if (data) {
          console.log('Message saved successfully:', data);
          setMessages((prev) => [...prev, data as Message]);
          if (senderType === 'hearing') {
            setLatestTranslatedText(text);
            setAvatarStatus('thinking');
            setTimeout(() => {
              setAvatarStatus('signing');
              setSignData({ text, gloss: text.split(' '), timestamps: [], duration: text.length * 0.1 });
            }, 800);
          }
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        alert('An unexpected error occurred. Please check the console and DATABASE_SETUP.md file.');
      }
    },
    [conversation, userId, setAvatarStatus, setSignData]
  );

  function handleDeafText(text: string) {
    sendMessage(text, 'deaf', 'text');
    setLatestTranslatedText(text);
  }

  function handleHearingText(text: string) {
    sendMessage(text, 'hearing', 'text');
  }

  function handleRecognized(text: string) {
    sendMessage(text, 'deaf', 'sign_video');
    setLatestTranslatedText(text);
  }

  function handleTranscribed(text: string) {
    sendMessage(text, 'hearing', 'voice');
  }

  function handleSpeakLatest() {
    if (latestTranslatedText) {
      speak(latestTranslatedText);
    }
  }

  if (loading) return <LoadingScreen />;

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Back to dashboard" onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">
              {conversation?.title || 'Conversation'}
            </h1>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-success" /> Connected
              </span>
              <span>Avatar: <span className="capitalize">{avatarStatus}</span></span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-3 lg:h-[calc(100vh-12rem)]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:h-full min-h-[500px]"
        >
          <DeafUserPanel
            messages={messages}
            currentUserId={userId}
            onSendText={handleDeafText}
            onRecognized={handleRecognized}
            latestTranslatedText={latestTranslatedText}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:h-full min-h-[500px]"
        >
          <HearingUserPanel
            messages={messages}
            currentUserId={userId}
            onSendText={handleHearingText}
            onTranscribed={handleTranscribed}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:h-full min-h-[500px]"
        >
          <AvatarPanel />
        </motion.div>
      </div>
    </div>
  );
}
