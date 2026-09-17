import clsx from 'clsx'
import { formatShortDate } from '@/shared/lib'
import { Avatar } from '@/shared/ui'
import { getChatTitle } from '../lib/get-chat-title'
import type { ChatListItemProps } from './types'
import styles from './chat-list-item.module.css'

export function ChatListItem({ chat, preview, time, isActive, onSelect }: ChatListItemProps) {
  const title = getChatTitle(chat)

  return (
    <button
      type="button"
      className={clsx(styles.item, isActive && styles.active)}
      aria-current={isActive}
      onClick={() => onSelect(chat.id)}
    >
      <Avatar />
      <span className={styles.content}>
        <span className={styles.row}>
          <span className={styles.title}>{title}</span>
          {time !== undefined && <time className={styles.time}>{formatShortDate(time)}</time>}
        </span>
        <span className={styles.preview}>{preview ?? 'Нет сообщений'}</span>
      </span>
    </button>
  )
}
