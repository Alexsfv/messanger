import { useChatStore } from '@/entities/chat'
import { MessageComposer } from '@/features/send-message'
import { APP_NAME } from '@/shared/config'
import { ChatHeader } from './chat-header'
import { MessageList } from './message-list'
import styles from './chat-window.module.css'

export function ChatWindow() {
  const chat = useChatStore(({ chats, activeChatId }) =>
    activeChatId ? chats[activeChatId] : undefined,
  )

  return (
    <section className={styles.window}>
      {chat ? (
        <>
          <ChatHeader chat={chat} />
          <MessageList chatId={chat.id} />
          {/* key сбрасывает черновик и состояние отправки при переключении чата */}
          <MessageComposer key={chat.id} chatId={chat.id} />
        </>
      ) : (
        <div className={styles.placeholder}>
          <h2 className={styles.placeholderTitle}>{APP_NAME}</h2>
          <p className={styles.placeholderText}>
            Выберите чат или введите номер телефона, чтобы начать новый
          </p>
        </div>
      )}
    </section>
  )
}
