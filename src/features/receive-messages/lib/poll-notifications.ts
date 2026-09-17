import {
  deleteNotification,
  receiveNotification,
  type GreenApiCredentials,
  type WebhookBody,
} from '@/shared/api'
import { sleep } from '@/shared/lib'
import { POLLING_RETRY_DELAY_MS } from '../config'

/**
 * Читает очередь уведомлений GREEN-API, пока не отменён signal.
 * Уведомление удаляется только после обработки: если удаление не удалось,
 * оно придёт повторно, поэтому onNotification должен быть идемпотентным.
 */
export async function pollNotifications(
  credentials: GreenApiCredentials,
  onNotification: (body: WebhookBody) => void,
  signal: AbortSignal,
) {
  while (!signal.aborted) {
    try {
      const notification = await receiveNotification(credentials, signal)
      if (!notification) continue

      onNotification(notification.body)
      await deleteNotification(credentials, notification.receiptId, signal)
    } catch (error) {
      if (signal.aborted) return

      console.error('Не удалось получить уведомление GREEN-API', error)
      await sleep(POLLING_RETRY_DELAY_MS)
    }
  }
}
