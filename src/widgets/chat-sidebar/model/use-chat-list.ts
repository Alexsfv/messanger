import { useMemo } from 'react'
import { useChatStore } from '@/entities/chat'
import { useMessageStore } from '@/entities/message'

/** Чаты с последним сообщением: свежая переписка — выше */
export function useChatList() {
  const chats = useChatStore((state) => state.chats)
  const messagesByChatId = useMessageStore((state) => state.messagesByChatId)

  return useMemo(
    () =>
      Object.values(chats)
        .map((chat) => {
          const lastMessage = messagesByChatId[chat.id]?.at(-1)
          return { chat, lastMessage, lastActivity: lastMessage?.timestamp ?? chat.createdAt }
        })
        .sort((a, b) => b.lastActivity - a.lastActivity),
    [chats, messagesByChatId],
  )
}
