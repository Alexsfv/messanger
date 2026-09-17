import type { ChatDraft } from '@/entities/chat'
import type { Message } from '@/entities/message'
import { isIncomingMessageWebhook, type MessageData, type WebhookBody } from '@/shared/api'
import { MS_IN_SECOND } from '@/shared/config'

interface IncomingMessage {
  chat: ChatDraft
  message: Message
}

const getMessageText = ({ textMessageData, extendedTextMessageData }: MessageData) =>
  textMessageData?.textMessage ?? extendedTextMessageData?.text

/** Возвращает входящее текстовое сообщение и данные его чата; остальные уведомления — null */
export function mapIncomingMessage(body: WebhookBody): IncomingMessage | null {
  if (!isIncomingMessageWebhook(body)) return null

  const text = getMessageText(body.messageData)
  if (text === undefined) return null

  const { chatId, chatName, senderName } = body.senderData

  return {
    chat: { id: chatId, name: chatName || senderName || undefined },
    message: {
      id: body.idMessage,
      chatId,
      text,
      timestamp: body.timestamp * MS_IN_SECOND,
      direction: 'incoming',
    },
  }
}
