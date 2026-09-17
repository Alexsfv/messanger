import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoginPage } from '@/pages/login'
import { MessengerPage } from '@/pages/messenger'
import { expireSession } from '@/features/auth'
import { useSessionStore } from '@/entities/session'
import { isUnauthorizedError } from '@/shared/api'

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    // Токен сменили в личном кабинете: любая операция с ответом 401 завершает сессию
    onError: (error) => {
      if (isUnauthorizedError(error)) expireSession()
    },
  }),
})

export function App() {
  const isAuthorized = useSessionStore((state) => state.credentials !== null)

  return (
    <QueryClientProvider client={queryClient}>
      {isAuthorized ? <MessengerPage /> : <LoginPage />}
    </QueryClientProvider>
  )
}
