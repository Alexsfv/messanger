import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  deleteNotification,
  GreenApiError,
  receiveNotification,
  type ReceivedNotification,
} from '@/shared/api'
import { POLLING_RETRY_DELAY_MS } from '../config'
import { pollNotifications } from './poll-notifications'

vi.mock('@/shared/api', async (importOriginal) => ({
  ...(await importOriginal()),
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

const createHandlers = () => ({ onNotification: vi.fn(), onUnauthorized: vi.fn() })

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

    await pollNotifications(
      credentials,
      { ...createHandlers(), onNotification: (body) => calls.push(body.typeWebhook) },
      controller.signal,
    )

    expect(calls).toEqual(['stateInstanceChanged', 'delete'])
    expect(deleteNotification).toHaveBeenCalledWith(
      credentials,
      notification.receiptId,
      controller.signal,
    )
  })

  it('удаляет уведомление, даже если обработчик упал, чтобы не блокировать очередь', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const controller = new AbortController()
    const handlers = createHandlers()

    handlers.onNotification.mockImplementation(() => {
      throw new Error('Unexpected notification')
    })
    vi.mocked(receiveNotification)
      .mockResolvedValueOnce(notification)
      .mockImplementationOnce(stopPolling(controller))
    vi.mocked(deleteNotification).mockResolvedValue({ result: true })

    await pollNotifications(credentials, handlers, controller.signal)

    expect(deleteNotification).toHaveBeenCalledWith(
      credentials,
      notification.receiptId,
      controller.signal,
    )
  })

  it('ничего не обрабатывает, если очередь пуста', async () => {
    const controller = new AbortController()
    const handlers = createHandlers()

    vi.mocked(receiveNotification).mockImplementationOnce(stopPolling(controller))

    await pollNotifications(credentials, handlers, controller.signal)

    expect(handlers.onNotification).not.toHaveBeenCalled()
    expect(deleteNotification).not.toHaveBeenCalled()
  })

  it('после ошибки повторяет запрос с задержкой', async () => {
    vi.useFakeTimers()
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const controller = new AbortController()

    vi.mocked(receiveNotification)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockImplementationOnce(stopPolling(controller))

    const polling = pollNotifications(credentials, createHandlers(), controller.signal)

    await vi.advanceTimersByTimeAsync(POLLING_RETRY_DELAY_MS - 1)
    expect(receiveNotification).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(1)
    await polling
    expect(receiveNotification).toHaveBeenCalledTimes(2)
  })

  it('при ответе 401 сообщает о недействительном токене и прекращает опрос', async () => {
    const handlers = createHandlers()

    vi.mocked(receiveNotification).mockRejectedValue(new GreenApiError(401))

    await pollNotifications(credentials, handlers, new AbortController().signal)

    expect(handlers.onUnauthorized).toHaveBeenCalledTimes(1)
    expect(receiveNotification).toHaveBeenCalledTimes(1)
  })
})
