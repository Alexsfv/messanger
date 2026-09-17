import { useMemo } from 'react'
import { useChatStore } from '@/entities/chat'
import { useMessageStore } from '@/entities/message'
import type { ChatListEntry } from './types'

const getLastActivity = ({ chat, lastMessage }: ChatListEntry) =>
  lastMessage?.timestamp ?? chat.createdAt

/** Чаты с последним сообщением: свежая переписка — выше */
export function useChatList() {
  const chats = useChatStore((state) => state.chats)
  const messagesByChatId = useMessageStore((state) => state.messagesByChatId)

  return useMemo(
    () =>
      Object.values(chats)
        .map((chat): ChatListEntry => ({ chat, lastMessage: messagesByChatId[chat.id]?.at(-1) }))
        .sort((a, b) => getLastActivity(b) - getLastActivity(a)),
    [chats, messagesByChatId],
  )
}
