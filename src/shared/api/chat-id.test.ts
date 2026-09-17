import { describe, expect, it } from 'vitest'
import { getPhoneFromChatId, toPersonalChatId } from './chat-id'

describe('chat id', () => {
  it('строит chatId личного чата из номера', () => {
    expect(toPersonalChatId('79991234567')).toBe('79991234567@c.us')
  })

  it('извлекает номер из chatId личного чата', () => {
    expect(getPhoneFromChatId('79991234567@c.us')).toBe('79991234567')
  })

  it('не возвращает номер для группы', () => {
    expect(getPhoneFromChatId('120363043968066561@g.us')).toBeUndefined()
  })
})
