import { request } from './client'
import { RECEIVE_TIMEOUT_SEC } from './config'
import type {
  CheckWhatsappResponse,
  DeleteNotificationResponse,
  GreenApiCredentials,
  InstanceStateResponse,
  ReceivedNotification,
  SendMessageRequest,
  SendMessageResponse,
} from './types'

export const getStateInstance = (credentials: GreenApiCredentials) =>
  request<InstanceStateResponse>(credentials, 'getStateInstance')

export const checkWhatsapp = (credentials: GreenApiCredentials, chatId: string) =>
  request<CheckWhatsappResponse>(credentials, 'checkWhatsapp', {
    method: 'POST',
    body: { chatId },
  })

export const sendMessage = (credentials: GreenApiCredentials, body: SendMessageRequest) =>
  request<SendMessageResponse>(credentials, 'sendMessage', { method: 'POST', body })

/** Long polling: возвращает null, если за RECEIVE_TIMEOUT_SEC уведомлений не появилось */
export const receiveNotification = (credentials: GreenApiCredentials, signal?: AbortSignal) =>
  request<ReceivedNotification | null>(credentials, 'receiveNotification', {
    query: { receiveTimeout: String(RECEIVE_TIMEOUT_SEC) },
    signal,
  })

export const deleteNotification = (
  credentials: GreenApiCredentials,
  receiptId: number,
  signal?: AbortSignal,
) =>
  request<DeleteNotificationResponse>(credentials, 'deleteNotification', {
    method: 'DELETE',
    pathParams: [receiptId],
    signal,
  })
