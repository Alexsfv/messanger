import clsx from 'clsx'
import { formatTime } from '@/shared/lib'
import type { MessageBubbleProps } from './types'
import styles from './message-bubble.module.css'

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={clsx(styles.bubble, styles[message.direction])}>
      <span className={styles.text}>{message.text}</span>
      <time className={styles.time}>{formatTime(message.timestamp)}</time>
    </div>
  )
}
