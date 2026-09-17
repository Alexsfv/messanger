import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/shared/config'
import type { Message, MessageState } from './types'

/** Общая ссылка для чатов без сообщений: новый [] в селекторе вызывал бы бесконечный ререндер */
const EMPTY_MESSAGES: Message[] = []

export const useMessageStore = create<MessageState>()(
  persist(
    (set) => ({
      messagesByChatId: {},
      addMessage: (message) =>
        set((state) => {
          const messages = state.messagesByChatId[message.chatId] ?? EMPTY_MESSAGES

          if (messages.some(({ id }) => id === message.id)) return state

          return {
            messagesByChatId: {
              ...state.messagesByChatId,
              [message.chatId]: [...messages, message],
            },
          }
        }),
      reset: () => set({ messagesByChatId: {} }),
    }),
    { name: STORAGE_KEYS.messages },
  ),
)

export const useChatMessages = (chatId: string) =>
  useMessageStore((state) => state.messagesByChatId[chatId] ?? EMPTY_MESSAGES)
