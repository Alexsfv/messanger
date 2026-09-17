export interface GreenApiCredentials {
  idInstance: string
  apiTokenInstance: string
}

export type InstanceState =
  | 'notAuthorized'
  | 'authorized'
  | 'blocked'
  | 'starting'
  | 'suspended'
  // Устаревшие статусы, которые ещё может вернуть сервер
  | 'sleepMode'
  | 'yellowCard'

export interface InstanceStateResponse {
  stateInstance: InstanceState
}

export interface CheckWhatsappResponse {
  existsWhatsapp: boolean
  /** Номер в формате 79991234567@c.us; пустой, если скрыт настройками приватности */
  phoneNumber: string
}

export interface SendMessageRequest {
  chatId: string
  message: string
}

export interface SendMessageResponse {
  idMessage: string
}

export interface SenderData {
  chatId: string
  chatName: string
  senderName: string
}

/** Описаны только поля текстовых сообщений: остальные типы приложение не обрабатывает */
export interface MessageData {
  typeMessage: string
  textMessageData?: { textMessage: string }
  extendedTextMessageData?: { text: string }
}

export interface WebhookBody {
  typeWebhook: string
}

export interface IncomingMessageWebhook extends WebhookBody {
  typeWebhook: 'incomingMessageReceived'
  idMessage: string
  timestamp: number
  senderData: SenderData
  messageData: MessageData
}

export interface ReceivedNotification {
  receiptId: number
  body: WebhookBody
}

export interface DeleteNotificationResponse {
  result: boolean
}
