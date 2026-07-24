import { create } from 'zustand';
import type { Message, SenderType, InputType } from '@/types/message';

interface ConversationState {
  activeConversationId: string | null;
  messages: Message[];
  participantType: SenderType;
  isRecording: boolean;
  isTranslating: boolean;
  speakingMessageId: string | null;
  setActiveConversation: (id: string | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setParticipantType: (type: SenderType) => void;
  setIsRecording: (recording: boolean) => void;
  setIsTranslating: (translating: boolean) => void;
  setSpeakingMessageId: (id: string | null) => void;
  reset: () => void;
}

export const useConversationStore = create<ConversationState>((set) => ({
  activeConversationId: null,
  messages: [],
  participantType: 'deaf',
  isRecording: false,
  isTranslating: false,
  speakingMessageId: null,
  setActiveConversation: (id) => set({ activeConversationId: id }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setParticipantType: (type) => set({ participantType: type }),
  setIsRecording: (recording) => set({ isRecording: recording }),
  setIsTranslating: (translating) => set({ isTranslating: translating }),
  setSpeakingMessageId: (id) => set({ speakingMessageId: id }),
  reset: () =>
    set({
      activeConversationId: null,
      messages: [],
      isRecording: false,
      isTranslating: false,
      speakingMessageId: null,
    }),
}));

export type { SenderType, InputType };
