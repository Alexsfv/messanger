import { describe, expect, it } from 'vitest'
import type { MessageData } from '@/shared/api'
import { mapIncomingMessage } from './map-incoming-message'

const createIncomingWebhook = (messageData: MessageData, chatName = 'Иван Петров') => ({
  typeWebhook: 'incomingMessageReceived',
  idMessage: 'F7AEC1B7086ECDC7E6E45923F5EDB825',
  timestamp: 1588091580,
  senderData: { chatId: '79001234567@c.us', chatName, senderName: 'Иван' },
  messageData,
})

describe('mapIncomingMessage', () => {
  it('преобразует входящее текстовое сообщение', () => {
    const webhook = createIncomingWebhook({
      typeMessage: 'textMessage',
      textMessageData: { textMessage: 'Привет' },
    })

    expect(mapIncomingMessage(webhook)).toEqual({
      chat: { id: '79001234567@c.us', name: 'Иван Петров' },
      message: {
        id: 'F7AEC1B7086ECDC7E6E45923F5EDB825',
        chatId: '79001234567@c.us',
        text: 'Привет',
        timestamp: 1588091580000,
        direction: 'incoming',
      },
    })
  })

  it('берёт текст расширенного сообщения и ответа с цитатой', () => {
    const webhook = createIncomingWebhook({
      typeMessage: 'quotedMessage',
      extendedTextMessageData: { text: 'Согласен' },
    })

    expect(mapIncomingMessage(webhook)?.message.text).toBe('Согласен')
  })

  it('использует имя отправителя, если у чата нет названия', () => {
    const webhook = createIncomingWebhook(
      { typeMessage: 'textMessage', textMessageData: { textMessage: 'Привет' } },
      '',
    )

    expect(mapIncomingMessage(webhook)?.chat.name).toBe('Иван')
  })

  it('игнорирует нетекстовые сообщения', () => {
    expect(mapIncomingMessage(createIncomingWebhook({ typeMessage: 'imageMessage' }))).toBeNull()
  })

  it('игнорирует остальные типы уведомлений', () => {
    expect(mapIncomingMessage({ typeWebhook: 'outgoingMessageStatus' })).toBeNull()
  })
})
