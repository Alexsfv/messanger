import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoginPage } from '@/pages/login'
import { MessengerPage } from '@/pages/messenger'
import { useSessionStore } from '@/entities/session'

const queryClient = new QueryClient()

export function App() {
  const isAuthorized = useSessionStore((state) => state.credentials !== null)

  return (
    <QueryClientProvider client={queryClient}>
      {isAuthorized ? <MessengerPage /> : <LoginPage />}
    </QueryClientProvider>
  )
}
