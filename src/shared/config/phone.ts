/** Международный формат E.164: код страны и номер, не больше 15 цифр */
export const PHONE_PATTERN = /^\d{8,15}$/

export const RU_PHONE_PATTERN = /^7(\d{3})(\d{3})(\d{2})(\d{2})$/
export const RU_PHONE_LENGTH = 11
export const RU_COUNTRY_CODE = '7'
export const RU_TRUNK_PREFIX = '8'
