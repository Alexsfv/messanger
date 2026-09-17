import type { IncomingMessageWebhook, WebhookBody } from './types'

export const isIncomingMessageWebhook = (body: WebhookBody): body is IncomingMessageWebhook =>
  body.typeWebhook === 'incomingMessageReceived'
