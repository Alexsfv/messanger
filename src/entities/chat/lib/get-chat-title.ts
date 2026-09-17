import { getPhoneFromChatId } from '@/shared/api'
import { formatPhone } from '@/shared/lib'
import type { Chat } from '../model/types'

export function getChatTitle({ id, name }: Chat) {
  const phone = getPhoneFromChatId(id)

  return name ?? (phone ? formatPhone(phone) : id)
}
