import {
  deleteNotification,
  isUnauthorizedError,
  receiveNotification,
  type GreenApiCredentials,
} from '@/shared/api'
import { sleep } from '@/shared/lib'
import { POLLING_RETRY_DELAY_MS } from '../config'
import type { NotificationHandlers } from '../model/types'

/**
 * Читает очередь уведомлений GREEN-API, пока не отменён signal.
 * Уведомление удаляется после обработки: если удаление не удалось, оно придёт повторно,
 * поэтому onNotification должен быть идемпотентным. Ошибка обработчика не останавливает очередь.
 */
export async function pollNotifications(
  credentials: GreenApiCredentials,
  { onNotification, onUnauthorized }: NotificationHandlers,
  signal: AbortSignal,
) {
  while (!signal.aborted) {
    try {
      const notification = await receiveNotification(credentials, signal)
      if (!notification) continue

      try {
        onNotification(notification.body)
      } catch (error) {
        console.error('Не удалось обработать уведомление GREEN-API', notification.body, error)
      }

      await deleteNotification(credentials, notification.receiptId, signal)
    } catch (error) {
      if (signal.aborted) return

      // Повтор с тем же токеном бесполезен
      if (isUnauthorizedError(error)) return onUnauthorized()

      console.error('Не удалось получить уведомление GREEN-API', error)
      await sleep(POLLING_RETRY_DELAY_MS)
    }
  }
}
