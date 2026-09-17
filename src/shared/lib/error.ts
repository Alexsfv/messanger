import { UNKNOWN_ERROR_MESSAGE } from '@/shared/config'

export const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
