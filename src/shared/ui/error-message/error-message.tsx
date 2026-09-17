import clsx from 'clsx'
import { getErrorMessage } from '@/shared/lib'
import type { ErrorMessageProps } from './types'
import styles from './error-message.module.css'

export function ErrorMessage({ error, className }: ErrorMessageProps) {
  if (!error) return null

  return (
    <p role="alert" className={clsx(styles.error, className)}>
      {getErrorMessage(error)}
    </p>
  )
}
