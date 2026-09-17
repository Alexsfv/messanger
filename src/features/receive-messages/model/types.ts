import type { ChatDraft } from '@/entities/chat'
import type { Message } from '@/entities/message'
import type { WebhookBody } from '@/shared/api'

export interface IncomingMessage {
  chat: ChatDraft
  message: Message
}

export interface NotificationHandlers {
  onNotification: (body: WebhookBody) => void
  /** Токен больше не принимается: опрос останавливается */
  onUnauthorized: () => void
}
