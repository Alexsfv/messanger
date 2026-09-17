export const APP_NAME = 'WhatsApp Chat'

export const APP_LOCALE = 'ru-RU'

export const STORAGE_KEYS = {
  session: 'whatsapp-chat:session',
  chats: 'whatsapp-chat:chats',
  messages: 'whatsapp-chat:messages',
} as const

export const NETWORK_ERROR_MESSAGE =
  'Не удалось подключиться к GREEN-API. Проверьте интернет-соединение и idInstance'
export const UNKNOWN_ERROR_MESSAGE = 'Что-то пошло не так, попробуйте ещё раз'

export const MS_IN_SECOND = 1000

export const GREEN_API_CONSOLE_URL = 'https://console.green-api.com'
