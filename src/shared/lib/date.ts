import { APP_LOCALE } from '@/shared/config'

const timeFormatter = new Intl.DateTimeFormat(APP_LOCALE, { hour: '2-digit', minute: '2-digit' })
const dateFormatter = new Intl.DateTimeFormat(APP_LOCALE, {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
})

export const formatTime = (timestamp: number) => timeFormatter.format(timestamp)

const isToday = (timestamp: number) =>
  new Date(timestamp).toDateString() === new Date().toDateString()

/** Время для сегодняшних событий, дата — для более ранних */
export const formatShortDate = (timestamp: number) =>
  isToday(timestamp) ? formatTime(timestamp) : dateFormatter.format(timestamp)
