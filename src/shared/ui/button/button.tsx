import clsx from 'clsx'
import type { ButtonProps } from './types'
import styles from './button.module.css'

export function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return (
    <button type={type} className={clsx(styles.button, styles[variant], className)} {...props} />
  )
}
