export interface Message {
  /** idMessage из GREEN-API */
  id: string
  chatId: string
  text: string
  timestamp: number
  direction: 'incoming' | 'outgoing'
}

export interface MessageState {
  messagesByChatId: Record<string, Message[]>
  /** Идемпотентно: повторно полученное уведомление не создаёт дубль */
  addMessage: (message: Message) => void
  reset: () => void
}
