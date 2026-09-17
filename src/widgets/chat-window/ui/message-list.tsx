import { MessageBubble, useChatMessages } from '@/entities/message'
import type { MessageListProps } from './types'
import styles from './message-list.module.css'

export function MessageList({ chatId }: MessageListProps) {
  const messages = useChatMessages(chatId)

  return (
    // column-reverse удерживает прокрутку у последнего сообщения без эффектов и ref
    <div className={styles.scroller}>
      <div className={styles.list} role="log" aria-label="Сообщения">
        {messages.length === 0 && <p className={styles.empty}>Напишите первое сообщение</p>}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
    </div>
  )
}
