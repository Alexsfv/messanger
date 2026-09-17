import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/shared/config'
import type { SessionState } from './types'

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      credentials: null,
      notice: null,
      signIn: (credentials) => set({ credentials, notice: null }),
      signOut: (notice) => set({ credentials: null, notice: notice ?? null }),
    }),
    { name: STORAGE_KEYS.session },
  ),
)

/** Для компонентов, которые рендерятся только в авторизованной зоне приложения */
export function useCredentials() {
  const credentials = useSessionStore((state) => state.credentials)

  if (!credentials) {
    throw new Error('useCredentials must be used inside an authorized session')
  }

  return credentials
}
