import { useMutation } from '@tanstack/react-query'
import { useChatStore, type ChatDraft } from '@/entities/chat'
import { useCredentials } from '@/entities/session'
import { checkWhatsapp, toPersonalChatId } from '@/shared/api'
import { isValidPhone, normalizePhone } from '@/shared/lib'
import { ACCOUNT_NOT_FOUND_ERROR, INVALID_PHONE_ERROR } from '../config'

/** Проверяет, что у номера есть WhatsApp, и открывает чат с ним */
export function useCreateChat() {
  const credentials = useCredentials()
  const upsertChat = useChatStore((state) => state.upsertChat)
  const selectChat = useChatStore((state) => state.selectChat)

  return useMutation({
    mutationFn: async (value: string): Promise<ChatDraft> => {
      const phone = normalizePhone(value)

      if (!isValidPhone(phone)) throw new Error(INVALID_PHONE_ERROR)

      const chatId = toPersonalChatId(phone)

      // Повторная проверка номера не нужна и расходует лимиты checkWhatsapp
      const existingChat = useChatStore.getState().chats[chatId]
      if (existingChat) return existingChat

      const { existsWhatsapp, phoneNumber } = await checkWhatsapp(credentials, chatId)

      if (!existsWhatsapp) throw new Error(ACCOUNT_NOT_FOUND_ERROR)

      // WhatsApp возвращает номер в каноническом виде: в некоторых странах он отличается от введённого
      return { id: phoneNumber || chatId }
    },
    onSuccess: (chat) => {
      upsertChat(chat)
      selectChat(chat.id)
    },
  })
}
