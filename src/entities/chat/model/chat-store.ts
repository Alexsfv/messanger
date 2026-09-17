import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/shared/config'
import type { Chat, ChatDraft } from './types'

interface ChatState {
  chats: Record<string, Chat>
  activeChatId: string | null
  /** Создаёт чат или обновляет имя существующего, сохраняя дату создания */
  upsertChat: (chat: ChatDraft) => void
  selectChat: (chatId: string | null) => void
  reset: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      chats: {},
      activeChatId: null,
      upsertChat: ({ id, name }) =>
        set(({ chats }) => {
          const existing = chats[id]

          return {
            chats: {
              ...chats,
              [id]: {
                id,
                name: name ?? existing?.name,
                createdAt: existing?.createdAt ?? Date.now(),
              },
            },
          }
        }),
      selectChat: (activeChatId) => set({ activeChatId }),
      reset: () => set({ chats: {}, activeChatId: null }),
    }),
    { name: STORAGE_KEYS.chats },
  ),
)
