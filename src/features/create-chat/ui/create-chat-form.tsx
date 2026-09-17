import { useState, type FormEvent } from 'react'
import { Button, ErrorMessage, Input, PlusIcon } from '@/shared/ui'
import { useCreateChat } from '../model/use-create-chat'
import styles from './create-chat-form.module.css'

export function CreateChatForm() {
  const [phone, setPhone] = useState('')
  const { mutate: createChat, isPending, error } = useCreateChat()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createChat(phone, { onSuccess: () => setPhone('') })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <Input
          className={styles.input}
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Номер телефона получателя"
          aria-label="Номер телефона получателя"
          autoComplete="tel"
          required
        />
        <Button
          type="submit"
          variant="icon"
          className={styles.submit}
          disabled={isPending}
          aria-label="Создать чат"
          title="Создать чат"
        >
          <PlusIcon />
        </Button>
      </div>
      <ErrorMessage error={error} />
    </form>
  )
}
