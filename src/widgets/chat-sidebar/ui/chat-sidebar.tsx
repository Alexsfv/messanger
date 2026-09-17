import { ChatListItem, useChatStore } from '@/entities/chat'
import { LogoutButton } from '@/features/auth'
import { CreateChatForm } from '@/features/create-chat'
import { useChatList } from '../model/use-chat-list'
import styles from './chat-sidebar.module.css'

export function ChatSidebar() {
  const chatList = useChatList()
  const activeChatId = useChatStore((state) => state.activeChatId)
  const selectChat = useChatStore((state) => state.selectChat)

  return (
    <aside className={styles.sidebar}>
      <header className={styles.header}>
        <h1 className={styles.title}>Чаты</h1>
        <LogoutButton />
      </header>

      <div className={styles.createChat}>
        <CreateChatForm />
      </div>

      {chatList.length > 0 ? (
        <ul className={styles.list}>
          {chatList.map(({ chat, lastMessage }) => (
            <li key={chat.id}>
              <ChatListItem
                chat={chat}
                preview={lastMessage?.text}
                time={lastMessage?.timestamp}
                isActive={chat.id === activeChatId}
                onSelect={selectChat}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>Введите номер телефона получателя, чтобы начать переписку</p>
      )}
    </aside>
  )
}
