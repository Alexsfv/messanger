import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { MESSAGE_MAX_LENGTH } from '@/shared/api'
import { Button, ErrorMessage, SendIcon } from '@/shared/ui'
import { useSendMessage } from '../model/use-send-message'
import styles from './message-composer.module.css'

interface MessageComposerProps {
  chatId: string
}

export function MessageComposer({ chatId }: MessageComposerProps) {
  const [text, setText] = useState('')
  const { mutate: send, isPending, error } = useSendMessage(chatId)
  const message = text.trim()
  const canSend = message.length > 0 && !isPending

  const submit = () => {
    if (canSend) send(message, { onSuccess: () => setText('') })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submit()
  }

  // Enter отправляет, Shift+Enter переносит строку; во время набора через IME Enter не перехватываем
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <form className={styles.composer} onSubmit={handleSubmit}>
      <ErrorMessage error={error} className={styles.error} />
      <div className={styles.field}>
        <textarea
          className={styles.input}
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={isPending}
          maxLength={MESSAGE_MAX_LENGTH}
          placeholder="Сообщение"
          aria-label="Текст сообщения"
          rows={1}
          autoFocus
        />
        <Button
          type="submit"
          variant="icon"
          className={styles.send}
          disabled={!canSend}
          aria-label="Отправить"
          title="Отправить"
        >
          <SendIcon />
        </Button>
      </div>
    </form>
  )
}
