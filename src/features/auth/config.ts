import type { InstanceState } from '@/shared/api'

export const INSTANCE_STATE_ERRORS: Partial<Record<InstanceState, string>> = {
  notAuthorized: 'Инстанс не авторизован: отсканируйте QR-код в личном кабинете GREEN-API',
  blocked: 'Аккаунт WhatsApp заблокирован',
  starting: 'Инстанс запускается, попробуйте через несколько минут',
  suspended: 'На аккаунте WhatsApp действуют временные ограничения',
  sleepMode: 'Телефон с WhatsApp не в сети: подключите его к интернету и подождите',
  yellowCard: 'На аккаунте WhatsApp действуют временные ограничения',
}

export const UNAVAILABLE_INSTANCE_ERROR = 'Инстанс недоступен для отправки сообщений'
