import type { GreenApiCredentials } from '@/shared/api'

export interface SessionState {
  credentials: GreenApiCredentials | null
  /** Причина принудительного выхода: показывается на экране входа */
  notice: string | null
  signIn: (credentials: GreenApiCredentials) => void
  signOut: (notice?: string) => void
}
