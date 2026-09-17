import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GreenApiCredentials } from '@/shared/api'
import { STORAGE_KEYS } from '@/shared/config'

interface SessionState {
  credentials: GreenApiCredentials | null
  signIn: (credentials: GreenApiCredentials) => void
  signOut: () => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      credentials: null,
      signIn: (credentials) => set({ credentials }),
      signOut: () => set({ credentials: null }),
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
