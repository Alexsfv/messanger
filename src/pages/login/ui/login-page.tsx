import { LoginForm } from '@/features/auth'
import { GREEN_API_CONSOLE_URL } from '@/shared/config'
import styles from './login-page.module.css'

export function LoginPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Вход в WhatsApp Chat</h1>
        <p className={styles.description}>
          Укажите данные инстанса из{' '}
          <a href={GREEN_API_CONSOLE_URL} target="_blank" rel="noreferrer">
            личного кабинета GREEN-API
          </a>
        </p>
        <LoginForm />
      </section>
    </main>
  )
}
