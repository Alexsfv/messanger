import type { Chat } from '@/entities/chat'
import type { Message } from '@/entities/message'

export interface ChatListEntry {
  chat: Chat
  lastMessage?: Message
}
