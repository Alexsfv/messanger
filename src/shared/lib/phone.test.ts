import { describe, expect, it } from 'vitest'
import { formatPhone, isValidPhone, normalizePhone } from './phone'

describe('normalizePhone', () => {
  it('удаляет всё, кроме цифр', () => {
    expect(normalizePhone('+7 (999) 123-45-67')).toBe('79991234567')
  })

  it('заменяет российский префикс 8 на код страны 7', () => {
    expect(normalizePhone('8 999 123 45 67')).toBe('79991234567')
  })

  it('не меняет иностранные номера', () => {
    expect(normalizePhone('+375 29 123-45-67')).toBe('375291234567')
  })
})

describe('isValidPhone', () => {
  it.each(['79991234567', '375291234567', '4915123456789'])('принимает %s', (phone) => {
    expect(isValidPhone(phone)).toBe(true)
  })

  it.each(['', '1234567', '1234567890123456', '7999abc4567'])('отклоняет «%s»', (phone) => {
    expect(isValidPhone(phone)).toBe(false)
  })
})

describe('formatPhone', () => {
  it('форматирует российский номер', () => {
    expect(formatPhone('79991234567')).toBe('+7 999 123-45-67')
  })

  it('добавляет + к остальным номерам', () => {
    expect(formatPhone('375291234567')).toBe('+375291234567')
  })
})
