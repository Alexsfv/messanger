import { useMutation } from '@tanstack/react-query'
import { useSessionStore } from '@/entities/session'
import { getStateInstance, type GreenApiCredentials } from '@/shared/api'
import { INSTANCE_STATE_ERRORS, UNAVAILABLE_INSTANCE_ERROR } from '../config'

/** Проверяет учётные данные запросом состояния инстанса: отправлять сообщения может только авторизованный */
export function useLogin() {
  const signIn = useSessionStore((state) => state.signIn)

  return useMutation({
    mutationFn: async (credentials: GreenApiCredentials) => {
      const { stateInstance } = await getStateInstance(credentials)

      if (stateInstance !== 'authorized') {
        throw new Error(INSTANCE_STATE_ERRORS[stateInstance] ?? UNAVAILABLE_INSTANCE_ERROR)
      }

      return credentials
    },
    onSuccess: signIn,
  })
}
