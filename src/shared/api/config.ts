/** Хост API определяется первыми цифрами idInstance: 7107123456 → https://7107.api.green-api.com */
export const API_HOST = 'api.green-api.com'
export const API_HOST_PREFIX_LENGTH = 4

/** Сколько секунд сервер держит запрос ReceiveNotification в ожидании уведомления (5–60) */
export const RECEIVE_TIMEOUT_SEC = 20

export const MESSAGE_MAX_LENGTH = 20000

/** Суффикс личного чата: 79991234567@c.us */
export const PERSONAL_CHAT_SUFFIX = '@c.us'

export const HTTP_ERROR_MESSAGES: Partial<Record<number, string>> = {
  400: 'GREEN-API отклонил запрос: проверьте введённые данные',
  401: 'Неверный idInstance или apiTokenInstance',
  403: 'Доступ запрещён: проверьте idInstance и apiTokenInstance',
  // Так отвечает инстанс другого мессенджера, у которого нет вызванного метода
  404: 'Метод недоступен для этого инстанса: убедитесь, что инстанс создан для WhatsApp',
  429: 'Слишком много запросов, попробуйте позже',
  466: 'Исчерпан лимит тарифа GREEN-API',
}

export const DEFAULT_HTTP_ERROR_MESSAGE = 'Сервис GREEN-API вернул ошибку'
