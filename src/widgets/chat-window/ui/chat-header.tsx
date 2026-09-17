import { getChatTitle, useChatStore } from '@/entities/chat'
import { getPhoneFromChatId } from '@/shared/api'
import { formatPhone } from '@/shared/lib'
import { ArrowLeftIcon, Avatar, Button } from '@/shared/ui'
import type { ChatHeaderProps } from './types'
import styles from './chat-header.module.css'

export function ChatHeader({ chat }: ChatHeaderProps) {
  const selectChat = useChatStore((state) => state.selectChat)
  const phone = getPhoneFromChatId(chat.id)
  // Если заголовок — имя, номер показываем отдельно
  const subtitle = chat.name && phone ? formatPhone(phone) : undefined

  return (
    <header className={styles.header}>
      <Button
        variant="icon"
        className={styles.back}
        aria-label="Назад к чатам"
        onClick={() => selectChat(null)}
      >
        <ArrowLeftIcon />
      </Button>
      <Avatar size="s" />
      <div className={styles.info}>
        <h2 className={styles.title}>{getChatTitle(chat)}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </header>
  )
}
