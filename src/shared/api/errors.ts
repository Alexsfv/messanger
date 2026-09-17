import { DEFAULT_HTTP_ERROR_MESSAGE, HTTP_ERROR_MESSAGES, UNAUTHORIZED_STATUS } from './config'

/** HTTP-ошибка GREEN-API: message готов к показу пользователю, status — для обработки в коде */
export class GreenApiError extends Error {
  readonly status: number

  constructor(status: number) {
    super(HTTP_ERROR_MESSAGES[status] ?? `${DEFAULT_HTTP_ERROR_MESSAGE} (${status})`)
    this.name = 'GreenApiError'
    this.status = status
  }
}

export const isUnauthorizedError = (error: unknown) =>
  error instanceof GreenApiError && error.status === UNAUTHORIZED_STATUS
