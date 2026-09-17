import type { Chat } from '../model/types'

export interface ChatListItemProps {
  chat: Chat
  preview?: string
  time?: number
  isActive: boolean
  onSelect: (chatId: string) => void
}
