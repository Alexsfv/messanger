export interface Chat {
  /** chatId в WhatsApp: 79991234567@c.us для личного чата, …@g.us для группы */
  id: string
  name?: string
  createdAt: number
}

export type ChatDraft = Omit<Chat, 'createdAt'>
