import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/shared/config'
import type { ChatState } from './types'

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      chats: {},
      activeChatId: null,
      upsertChat: ({ id, name }) =>
        set((state) => {
          const existing = state.chats[id]

          // Без изменений возвращаем прежнее состояние, чтобы не перерисовывать подписчиков
          if (existing && (name === undefined || name === existing.name)) return state

          return {
            chats: {
              ...state.chats,
              [id]: { id, name, createdAt: existing?.createdAt ?? Date.now() },
            },
          }
        }),
      selectChat: (activeChatId) => set({ activeChatId }),
      reset: () => set({ chats: {}, activeChatId: null }),
    }),
    { name: STORAGE_KEYS.chats },
  ),
)
