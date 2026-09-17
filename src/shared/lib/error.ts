import { UNKNOWN_ERROR_MESSAGE } from '@/shared/config'

export function getErrorMessage(error: unknown) {
  if (typeof error === 'string') return error

  return error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
}
