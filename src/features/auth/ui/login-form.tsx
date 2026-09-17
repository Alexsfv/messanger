import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useSessionStore } from '@/entities/session'
import { Button, ErrorMessage, Input } from '@/shared/ui'
import { LOGIN_INITIAL_VALUES } from '../config'
import { useLogin } from '../model/use-login'
import styles from './login-form.module.css'

export function LoginForm() {
  const [values, setValues] = useState(LOGIN_INITIAL_VALUES)
  const { mutate: login, isPending, error } = useLogin()
  const notice = useSessionStore((state) => state.notice)

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [target.name]: target.value.trim() }))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login(values)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="idInstance"
        name="idInstance"
        value={values.idInstance}
        onChange={handleChange}
        placeholder="7107123456"
        inputMode="numeric"
        pattern="\d+"
        autoComplete="username"
        autoFocus
        required
      />
      <Input
        label="apiTokenInstance"
        name="apiTokenInstance"
        type="password"
        value={values.apiTokenInstance}
        onChange={handleChange}
        autoComplete="current-password"
        required
      />
      <ErrorMessage error={error ?? notice} />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Проверяем…' : 'Войти'}
      </Button>
    </form>
  )
}
