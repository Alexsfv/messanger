import clsx from 'clsx'
import type { ComponentProps } from 'react'
import styles from './input.module.css'

interface InputProps extends ComponentProps<'input'> {
  label?: string
}

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
