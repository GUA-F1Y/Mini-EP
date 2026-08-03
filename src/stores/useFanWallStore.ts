import { create } from 'zustand';
import { FanMessage } from '@/types';
import { MOCK_FAN_MESSAGES } from '@/lib/audio/mockTracks';
import { fanWallService } from '@/services/fanWallService';

interface FanWallState {
  messages: FanMessage[];
  likedMsgIds: string[];
  filterSort: 'newest' | 'most_liked';
  isLoading: boolean;
  
  // Actions
  fetchMessages: () => Promise<void>;
  setMessages: (messages: FanMessage[]) => void;
  addMessage: (name: string, location: string, message: string) => Promise<void>;
  toggleLikeMessage: (id: string) => Promise<void>;
  setFilterSort: (sort: 'newest' | 'most_liked') => void;
}

export const useFanWallStore = create<FanWallState>((set, get) => ({
  messages: MOCK_FAN_MESSAGES,
  likedMsgIds: [],
  filterSort: 'newest',
  isLoading: false,

  fetchMessages: async () => {
    set({ isLoading: true });
    const fetched = await fanWallService.getMessages();
    set({ messages: fetched, isLoading: false });
  },

  setMessages: (messages) => set({ messages }),

  addMessage: async (name, location, message) => {
    const tempId = `msg-${Date.now()}`;
    const optimisticMessage: FanMessage = {
      id: tempId,
      name: name.trim() || 'Anonymous Fan',
      location: location.trim() || 'Worldwide',
      message: message.trim(),
      likesCount: 1,
      createdAt: new Date().toISOString(),
      isApproved: true,
    };

    set((state) => ({
      messages: [optimisticMessage, ...state.messages],
      likedMsgIds: [...state.likedMsgIds, tempId],
    }));

    // Post to Supabase DB in background
    const saved = await fanWallService.postMessage(name, location, message);
    if (saved) {
      set((state) => ({
        messages: state.messages.map((m) => (m.id === tempId ? saved : m)),
        likedMsgIds: state.likedMsgIds.map((id) => (id === tempId ? saved.id : id)),
      }));
    }
  },

  toggleLikeMessage: async (id) => {
    const { likedMsgIds, messages } = get();
    const isLiked = likedMsgIds.includes(id);

    const updatedLikedIds = isLiked
      ? likedMsgIds.filter((mId) => mId !== id)
      : [...likedMsgIds, id];

    const updatedMessages = messages.map((msg) => {
      if (msg.id === id) {
        return {
          ...msg,
          likesCount: isLiked ? Math.max(0, msg.likesCount - 1) : msg.likesCount + 1,
        };
      }
      return msg;
    });

    set({
      likedMsgIds: updatedLikedIds,
      messages: updatedMessages,
    });

    if (!isLiked) {
      await fanWallService.likeMessage(id);
    }
  },

  setFilterSort: (filterSort) => set({ filterSort }),
}));
