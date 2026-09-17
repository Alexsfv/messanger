import { useChatStore } from '@/entities/chat'
import { useMessageStore } from '@/entities/message'
import { useSessionStore } from '@/entities/session'
import { SESSION_EXPIRED_NOTICE } from '../config'

/** История переписки принадлежит инстансу, поэтому при выходе очищается вместе с сессией */
export function logout(notice?: string) {
  useMessageStore.getState().reset()
  useChatStore.getState().reset()
  useSessionStore.getState().signOut(notice)
}

/** Завершает активную сессию, если GREEN-API перестал принимать токен */
export function expireSession() {
  if (useSessionStore.getState().credentials) logout(SESSION_EXPIRED_NOTICE)
}
