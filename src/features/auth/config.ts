import type { GreenApiCredentials, InstanceState } from '@/shared/api'

export const LOGIN_INITIAL_VALUES: GreenApiCredentials = { idInstance: '', apiTokenInstance: '' }

const ACCOUNT_RESTRICTED_ERROR = 'На аккаунте WhatsApp действуют временные ограничения'

export const INSTANCE_STATE_ERRORS: Partial<Record<InstanceState, string>> = {
  notAuthorized: 'Инстанс не авторизован: отсканируйте QR-код в личном кабинете GREEN-API',
  blocked: 'Аккаунт WhatsApp заблокирован',
  starting: 'Инстанс запускается, попробуйте через несколько минут',
  suspended: ACCOUNT_RESTRICTED_ERROR,
  sleepMode: 'Телефон с WhatsApp не в сети: подключите его к интернету и подождите',
  yellowCard: ACCOUNT_RESTRICTED_ERROR,
}

export const UNAVAILABLE_INSTANCE_ERROR = 'Инстанс недоступен для отправки сообщений'

export const SESSION_EXPIRED_NOTICE = 'apiTokenInstance больше не действует: войдите заново'
