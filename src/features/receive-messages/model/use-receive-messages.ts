import { useEffect } from 'react'
import { useChatStore } from '@/entities/chat'
import { useMessageStore } from '@/entities/message'
import { useCredentials } from '@/entities/session'
import type { WebhookBody } from '@/shared/api'
import { mapIncomingMessage } from '../lib/map-incoming-message'
import { pollNotifications } from '../lib/poll-notifications'
import type { NotificationHandlers } from './types'

function onNotification(body: WebhookBody) {
  const incoming = mapIncomingMessage(body)
  if (!incoming) return

  useChatStore.getState().upsertChat(incoming.chat)
  useMessageStore.getState().addMessage(incoming.message)
}

/** Получает входящие сообщения через HTTP API, пока смонтирован вызывающий компонент */
export function useReceiveMessages(onUnauthorized: NotificationHandlers['onUnauthorized']) {
  const credentials = useCredentials()

  useEffect(() => {
    const controller = new AbortController()
    void pollNotifications(credentials, { onNotification, onUnauthorized }, controller.signal)

    return () => controller.abort()
  }, [credentials, onUnauthorized])
}
