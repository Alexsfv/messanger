import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { deleteNotification, receiveNotification, type ReceivedNotification } from '@/shared/api'
import { POLLING_RETRY_DELAY_MS } from '../config'
import { pollNotifications } from './poll-notifications'

vi.mock('@/shared/api', () => ({
  receiveNotification: vi.fn(),
  deleteNotification: vi.fn(),
}))

const credentials = { idInstance: '7107000000', apiTokenInstance: 'token' }
const notification: ReceivedNotification = {
  receiptId: 1,
  body: { typeWebhook: 'stateInstanceChanged' },
}

/** Имитирует пустую очередь и останавливает опрос */
const stopPolling = (controller: AbortController) => async () => {
  controller.abort()
  return null
}

describe('pollNotifications', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('удаляет уведомление из очереди только после обработки', async () => {
    const controller = new AbortController()
    const calls: string[] = []

    vi.mocked(receiveNotification)
      .mockResolvedValueOnce(notification)
      .mockImplementationOnce(stopPolling(controller))
    vi.mocked(deleteNotification).mockImplementation(async () => {
      calls.push('delete')
      return { result: true }
    })

    await pollNotifications(credentials, (body) => calls.push(body.typeWebhook), controller.signal)

    expect(calls).toEqual(['stateInstanceChanged', 'delete'])
    expect(deleteNotification).toHaveBeenCalledWith(
      credentials,
      notification.receiptId,
      controller.signal,
    )
  })

  it('ничего не обрабатывает, если очередь пуста', async () => {
    const controller = new AbortController()
    const onNotification = vi.fn()

    vi.mocked(receiveNotification).mockImplementationOnce(stopPolling(controller))

    await pollNotifications(credentials, onNotification, controller.signal)

    expect(onNotification).not.toHaveBeenCalled()
    expect(deleteNotification).not.toHaveBeenCalled()
  })

  it('после ошибки повторяет запрос с задержкой', async () => {
    vi.useFakeTimers()
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const controller = new AbortController()

    vi.mocked(receiveNotification)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockImplementationOnce(stopPolling(controller))

    const polling = pollNotifications(credentials, vi.fn(), controller.signal)

    await vi.advanceTimersByTimeAsync(POLLING_RETRY_DELAY_MS - 1)
    expect(receiveNotification).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(1)
    await polling
    expect(receiveNotification).toHaveBeenCalledTimes(2)
  })
})
