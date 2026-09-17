import { useChatStore } from '@/entities/chat'
import { expireSession } from '@/features/auth'
import { useReceiveMessages } from '@/features/receive-messages'
import { ChatSidebar } from '@/widgets/chat-sidebar'
import { ChatWindow } from '@/widgets/chat-window'
import styles from './messenger-page.module.css'

export function MessengerPage() {
  useReceiveMessages(expireSession)
  const isChatOpen = useChatStore((state) => state.activeChatId !== null)

  return (
    <div className={styles.page} data-chat-open={isChatOpen}>
      <div className={styles.sidebar}>
        <ChatSidebar />
      </div>
      <main className={styles.main}>
        <ChatWindow />
      </main>
    </div>
  )
}
