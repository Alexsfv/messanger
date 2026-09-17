import {
  PHONE_PATTERN,
  RU_COUNTRY_CODE,
  RU_PHONE_LENGTH,
  RU_PHONE_PATTERN,
  RU_TRUNK_PREFIX,
} from '@/shared/config'

/** Оставляет только цифры и приводит российский номер с 8 к формату с 7 */
export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, '')

  return digits.length === RU_PHONE_LENGTH && digits.startsWith(RU_TRUNK_PREFIX)
    ? RU_COUNTRY_CODE + digits.slice(1)
    : digits
}

export const isValidPhone = (digits: string) => PHONE_PATTERN.test(digits)

export function formatPhone(digits: string) {
  const match = RU_PHONE_PATTERN.exec(digits)

  return match ? `+7 ${match[1]} ${match[2]}-${match[3]}-${match[4]}` : `+${digits}`
}
