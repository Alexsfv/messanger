import clsx from 'clsx'
import type { InputProps } from './types'
import styles from './input.module.css'

export function Input({ label, className, ...props }: InputProps) {
  const input = <input className={clsx(styles.input, className)} {...props} />

  if (!label) return input

  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      {input}
    </label>
  )
}
