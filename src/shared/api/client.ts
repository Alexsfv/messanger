import { NETWORK_ERROR_MESSAGE } from '@/shared/config'
import {
  API_HOST,
  API_HOST_PREFIX_LENGTH,
  DEFAULT_HTTP_ERROR_MESSAGE,
  HTTP_ERROR_MESSAGES,
} from './config'
import type { GreenApiCredentials } from './types'

interface RequestOptions {
  method?: 'GET' | 'POST' | 'DELETE'
  pathParams?: (string | number)[]
  query?: Record<string, string>
  body?: unknown
  signal?: AbortSignal
}

const JSON_HEADERS = { 'Content-Type': 'application/json' }

export const getApiUrl = (idInstance: string) =>
  `https://${idInstance.slice(0, API_HOST_PREFIX_LENGTH)}.${API_HOST}`

/** Формат запроса: {apiUrl}/waInstance{idInstance}/{method}/{apiTokenInstance}[/{pathParams}] */
export async function request<T>(
  { idInstance, apiTokenInstance }: GreenApiCredentials,
  apiMethod: string,
  { method = 'GET', pathParams = [], query, body, signal }: RequestOptions = {},
): Promise<T> {
  const path = [`waInstance${idInstance}`, apiMethod, apiTokenInstance, ...pathParams].join('/')
  const url = new URL(path, getApiUrl(idInstance))
  url.search = new URLSearchParams(query).toString()

  const response = await fetch(url, {
    method,
    signal,
    ...(body !== undefined && { headers: JSON_HEADERS, body: JSON.stringify(body) }),
  }).catch((cause: unknown) => {
    throw signal?.aborted ? cause : new Error(NETWORK_ERROR_MESSAGE, { cause })
  })

  if (!response.ok) {
    throw new Error(
      HTTP_ERROR_MESSAGES[response.status] ?? `${DEFAULT_HTTP_ERROR_MESSAGE} (${response.status})`,
    )
  }

  // Пустое тело — штатный ответ, например ReceiveNotification без новых уведомлений
  const text = await response.text()
  return (text ? JSON.parse(text) : null) as T
}
