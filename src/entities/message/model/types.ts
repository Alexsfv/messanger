export interface Message {
  /** idMessage из GREEN-API */
  id: string
  chatId: string
  text: string
  timestamp: number
  direction: 'incoming' | 'outgoing'
}
