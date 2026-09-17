import { NETWORK_ERROR_MESSAGE } from '@/shared/config'
import { API_HOST, API_HOST_PREFIX_LENGTH, JSON_HEADERS } from './config'
import { GreenApiError } from './errors'
import type { GreenApiCredentials, RequestOptions } from './types'

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

  if (!response.ok) throw new GreenApiError(response.status)

  // Пустое тело — штатный ответ, например ReceiveNotification без новых уведомлений
  const text = await response.text()
  return (text ? JSON.parse(text) : null) as T
}
