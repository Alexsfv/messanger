import { useChatStore } from '@/entities/chat'
import { useMessageStore } from '@/entities/message'
import { useSessionStore } from '@/entities/session'

/** История переписки принадлежит инстансу, поэтому при выходе очищается вместе с сессией */
export function logout() {
  useMessageStore.getState().reset()
  useChatStore.getState().reset()
  useSessionStore.getState().signOut()
}
