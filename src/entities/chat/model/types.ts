export interface Chat {
  /** chatId в WhatsApp: 79991234567@c.us для личного чата, …@g.us для группы */
  id: string
  name?: string
  createdAt: number
}

export type ChatDraft = Omit<Chat, 'createdAt'>

export interface ChatState {
  chats: Record<string, Chat>
  activeChatId: string | null
  /** Создаёт чат или обновляет имя существующего, сохраняя дату создания */
  upsertChat: (chat: ChatDraft) => void
  selectChat: (chatId: string | null) => void
  reset: () => void
}
