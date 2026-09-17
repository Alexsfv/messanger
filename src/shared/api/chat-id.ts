import { PERSONAL_CHAT_SUFFIX } from './config'

export const toPersonalChatId = (phone: string) => `${phone}${PERSONAL_CHAT_SUFFIX}`

/** Номер телефона для личного чата; у групп номера нет */
export const getPhoneFromChatId = (chatId: string) =>
  chatId.endsWith(PERSONAL_CHAT_SUFFIX) ? chatId.slice(0, -PERSONAL_CHAT_SUFFIX.length) : undefined
