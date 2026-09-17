import type { Chat } from '@/entities/chat'

export interface ChatHeaderProps {
  chat: Chat
}

export interface MessageListProps {
  chatId: string
}
