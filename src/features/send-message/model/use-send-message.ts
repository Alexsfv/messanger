import { useMutation } from '@tanstack/react-query'
import { useMessageStore } from '@/entities/message'
import { useCredentials } from '@/entities/session'
import { sendMessage } from '@/shared/api'

export function useSendMessage(chatId: string) {
  const credentials = useCredentials()
  const addMessage = useMessageStore((state) => state.addMessage)

  return useMutation({
    mutationFn: (text: string) => sendMessage(credentials, { chatId, message: text }),
    onSuccess: ({ idMessage }, text) =>
      addMessage({ id: idMessage, chatId, text, timestamp: Date.now(), direction: 'outgoing' }),
  })
}
